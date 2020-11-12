"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const typeorm_1 = require("typeorm");
const multer_2 = __importDefault(require("../config/multer"));
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const CreateUserService_1 = __importDefault(require("../services/UserServices/CreateUserService"));
const UpdateAvatarService_1 = __importDefault(require("../services/UserServices/UpdateAvatarService"));
const database_1 = __importDefault(require("../database"));
const ResetPasswordService_1 = __importDefault(require("../services/UserServices/ResetPasswordService"));
const SendNewPasswordByEmailService_1 = __importDefault(require("../services/UserServices/SendNewPasswordByEmailService"));
const UpdateUserPasswordService_1 = __importDefault(require("../services/UserServices/UpdateUserPasswordService"));
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
const UpdateProfileService_1 = __importDefault(require("../services/UserServices/UpdateProfileService"));
const ShowOneUserService_1 = __importDefault(require("../services/UserServices/ShowOneUserService"));
const DeleteUserService_1 = __importDefault(require("../services/UserServices/DeleteUserService"));
const ShowEventsAboutUserInterestService_1 = __importDefault(require("../services/UserServices/ShowEventsAboutUserInterestService"));
const ShowEventsWithEventTypeInteresOfUser_1 = __importDefault(require("../services/UserServices/ShowEventsWithEventTypeInteresOfUser"));
const usersRouter = express_1.Router();
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
        delete user.password;
        return response.status(200).json(user);
    }
    catch (err) {
        return response.status(400).json({
            error: 'Something went wrong, we could not create your account right now, try again later',
        });
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
        return response.status(200).json({
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
    try {
        const { id } = request.params;
        const showOneUserService = new ShowOneUserService_1.default(await database_1.default);
        const user = await showOneUserService.execute({ user_id: id });
        delete user.password;
        return response.status(200).json({ user });
    }
    catch (err) {
        return response.status(400).json({ err: err.message });
    }
});
usersRouter.post('/uploadAvatar', EnsureAuthenticated_1.default, multer_1.default(multer_2.default).single('avatar'), async (request, response) => {
    try {
        const { originalname, size, key, location: url = '', } = request.file;
        const { id } = request.user;
        const updateAvatarService = new UpdateAvatarService_1.default(await database_1.default);
        const post = await updateAvatarService.execute({
            id,
            name: originalname,
            size,
            key,
            url,
        });
        return response.status(200).json(post);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
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
usersRouter.get('/', async (request, response) => {
    try {
        const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.default);
        const listOfUsers = await usersRepository.find();
        const secureListOfUsers = listOfUsers.map(user => {
            delete user.password;
            return user;
        });
        return response.status(200).json(secureListOfUsers);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
usersRouter.delete('/deleteUser/:id', async (request, response) => {
    try {
        const deleteUserService = new DeleteUserService_1.default(await database_1.default);
        const { id } = request.params;
        await deleteUserService.execute({ user_id: id });
        return response.status(200).json({ message: 'User sucessful deleted' });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
usersRouter.post('/interests', EnsureAuthenticated_1.default, async (request, response) => {
    try {
        const { id } = request.user;
        const showEventsAboutUserInterestService = new ShowEventsAboutUserInterestService_1.default(await database_1.default);
        const appointments = await showEventsAboutUserInterestService.execute({
            id,
        });
        return response.status(200).json(appointments);
    }
    catch (err) {
        return response.status(400).json(err.message);
    }
});
usersRouter.post('/eventTypes', async (request, response) => {
    try {
        const { eventType_id } = request.body;
        const showEventsWithEventTypeInteresOfUser = new ShowEventsWithEventTypeInteresOfUser_1.default(await database_1.default);
        const appointmentsFiltredWithEventType = await showEventsWithEventTypeInteresOfUser.execute({ eventType_id });
        return response.status(200).json(appointmentsFiltredWithEventType);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = usersRouter;
