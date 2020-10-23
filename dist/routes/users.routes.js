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
const usersRouter = express_1.Router();
const upload = multer_1.default(upload_1.default);
usersRouter.post('/', async (request, response) => {
    const { name, email, password, avatar } = request.body;
    const createUserService = new CreateUserService_1.default();
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
        const updateAvatar = new UpdateAvatarService_1.default();
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
// usersRouter.post('/forgotPassword', async (request, response) => {
//     const { email } = request.body;
//     try {
//         const usersRepository = getRepository(User);
//         const user = usersRepository.findOne({ where: email });
//         if (!email) {
//             throw new Error('User not found');
//         }
//         const token = crypto.randomBytes(20).toString('hex');
//         const now = new Date();
//         now.setHours(now.getHours() + 1);
//     } catch (err) {
//         return response.status(400).json({ error: err.message });
//     }
// });
exports.default = usersRouter;
