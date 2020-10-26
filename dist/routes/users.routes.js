"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("../config/upload"));
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const UpdateAvatarService_1 = __importDefault(require("../services/UpdateAvatarService"));
const database_1 = __importDefault(require("../database"));
const ResetPasswordService_1 = __importDefault(require("../services/ResetPasswordService"));
const SendNewPasswordByEmailService_1 = __importDefault(require("../services/SendNewPasswordByEmailService"));
const usersRouter = express_1.Router();
const upload = multer_1.default(upload_1.default);
usersRouter.post('/', async (request, response) => {
    const { name, email, password, avatar } = request.body;
    const createUserService = new CreateUserService_1.default(await database_1.default);
    const user = await createUserService.execute({
        name,
        email,
        password,
        avatar,
    });
    return response.json(user);
});
usersRouter.patch('/avatar', EnsureAuthenticated_1.default, upload.single('avatar'), async (request, response) => {
    try {
        const updateAvatar = new UpdateAvatarService_1.default(await database_1.default);
        const { id } = request.user;
        const user = await updateAvatar.execute({
            user_id: id,
            avatarFilename: request.file.filename,
        });
        return response.status(200).json(user);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
usersRouter.post('/resetPassword', async (request, response) => {
    const { email } = request.body;
    const resetPasswordService = new ResetPasswordService_1.default(await database_1.default);
    const newPassword = await resetPasswordService.execute({ email });
    const sendNewPasswordByEmailService = new SendNewPasswordByEmailService_1.default();
    await sendNewPasswordByEmailService.execute({
        email,
        password: newPassword,
    });
    return response.json({ password: newPassword });
});
exports.default = usersRouter;
