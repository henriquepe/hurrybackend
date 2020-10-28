"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const typeorm_1 = require("typeorm");
const upload_1 = __importDefault(require("../config/upload"));
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const CreateUserService_1 = __importDefault(require("../services/UserServices/CreateUserService"));
const UpdateAvatarService_1 = __importDefault(require("../services/UserServices/UpdateAvatarService"));
const database_1 = __importDefault(require("../database"));
const ResetPasswordService_1 = __importDefault(require("../services/UserServices/ResetPasswordService"));
const SendNewPasswordByEmailService_1 = __importDefault(require("../services/UserServices/SendNewPasswordByEmailService"));
const UpdateUserPasswordService_1 = __importDefault(require("../services/UserServices/UpdateUserPasswordService"));
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
const UpdateProfileService_1 = __importDefault(require("../services/UserServices/UpdateProfileService"));
const usersRouter = express_1.Router();
const upload = multer_1.default(upload_1.default);
usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password, avatar, musicinterest1_id, musicinterest2_id, musicinterest3_id, love, state, city, birthday, cpf, cellphone, } = request.body;
        const createUserService = new CreateUserService_1.default(await database_1.default);
        const user = await createUserService.execute({
            name,
            email,
            password,
            avatar,
            musicInterest1_id: musicinterest1_id,
            musicInterest2_id: musicinterest2_id,
            musicInterest3_id: musicinterest3_id,
            love,
            state,
            city,
            birthday,
            cpf,
            cellphone,
        });
        return response.json(user);
    }
    catch (err) {
        if (!err) {
            return response.status(400).json({
                error: 'Something went wrong, we could not create your account right now, try again later',
            });
        }
        return response.status(400).json({ error: err.message });
    }
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
    try {
        const { email } = request.body;
        const resetPasswordService = new ResetPasswordService_1.default(await database_1.default);
        const newPassword = await resetPasswordService.execute({ email });
        const sendNewPasswordByEmailService = new SendNewPasswordByEmailService_1.default();
        await sendNewPasswordByEmailService.execute({
            email,
            password: newPassword,
        });
        return response.json({
            message: 'A new password was sended to your email',
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
usersRouter.post('/updatePassword', EnsureAuthenticated_1.default, async (request, response) => {
    try {
        const { oldPassword, newPassword } = request.body;
        const { id } = request.user;
        const updateUserPasswordService = new UpdateUserPasswordService_1.default(await database_1.default);
        await updateUserPasswordService.execute({
            user_id: id,
            oldPassword,
            newPassword,
        });
        return response.status(200).json({ message: 'password changed' });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
usersRouter.get('/:id', async (request, response) => {
    const { id } = request.params;
    const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.default);
    const user = await usersRepository.findOne(id);
    delete user.password;
    return response.status(200).json({ user });
});
usersRouter.patch('/updateUserProfile', EnsureAuthenticated_1.default, async (request, response) => {
    try {
        const { id } = request.user;
        const { name, email, musicinterest1_id, musicinterest2_id, musicinterest3_id, love, state, city, birthday, cpf, cellphone, } = request.body;
        const updateProfileService = new UpdateProfileService_1.default(await database_1.default);
        const user = await updateProfileService.execute({
            id,
            name,
            email,
            musicinterest1_id,
            musicinterest2_id,
            musicinterest3_id,
            love,
            state,
            city,
            birthday,
            cpf,
            cellphone,
        });
        delete user.password;
        return response.status(200).json({ user });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = usersRouter;
