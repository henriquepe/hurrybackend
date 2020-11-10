import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository, getRepository } from 'typeorm';
import multerConfig from '../config/multer';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import CreateUserService from '../services/UserServices/CreateUserService';
import UpdateAvatarService from '../services/UserServices/UpdateAvatarService';
import connection from '../database';
import ResetPasswordService from '../services/UserServices/ResetPasswordService';
import SendNewPasswordByEmailService from '../services/UserServices/SendNewPasswordByEmailService';
import UpdateUserPasswordService from '../services/UserServices/UpdateUserPasswordService';
import UsersRepository from '../repositories/UsersRepository';
import UpdateProfileService from '../services/UserServices/UpdateProfileService';
import ShowOneUserService from '../services/UserServices/ShowOneUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const {
            name,
            email,
            password,
            avatar,
            musicinterest1_id,
            musicinterest2_id,
            musicinterest3_id,
            love,
            state,
            city,
            birthday,
            cpf,
            cellphone,
        } = request.body;

        const createUserService = new CreateUserService(await connection);

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
    } catch (err) {
        if (!err) {
            return response.status(400).json({
                error:
                    'Something went wrong, we could not create your account right now, try again later',
            });
        }

        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateAvatar = new UpdateAvatarService(await connection);

            const { id } = request.user;

            const user = await updateAvatar.execute({
                user_id: id,
                avatarFilename: request.file.filename,
            });

            return response.status(200).json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

usersRouter.post('/resetPassword', async (request, response) => {
    try {
        const { email } = request.body;

        const resetPasswordService = new ResetPasswordService(await connection);

        const newPassword = await resetPasswordService.execute({ email });

        const sendNewPasswordByEmailService = new SendNewPasswordByEmailService();

        await sendNewPasswordByEmailService.execute({
            email,
            password: newPassword,
        });

        return response.json({
            message: 'A new password was sended to your email',
        });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.post(
    '/updatePassword',
    ensureAuthenticated,
    async (request, response) => {
        try {
            const { oldPassword, newPassword } = request.body;

            const { id } = request.user;

            const updateUserPasswordService = new UpdateUserPasswordService(
                await connection,
            );

            await updateUserPasswordService.execute({
                user_id: id,
                oldPassword,
                newPassword,
            });

            return response.status(200).json({ message: 'password changed' });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

usersRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const showOneUserService = new ShowOneUserService(await connection);

        const user = await showOneUserService.execute({ user_id: id });

        delete user.password;

        return response.status(200).json({ user });
    } catch (err) {
        return response.status(400).json({ err: err.message });
    }
});

usersRouter.post(
    '/uploadAvatar',
    ensureAuthenticated,
    multer(multerConfig).single('avatar'),
    async (request, response) => {
        console.log(request.file.originalname);

        const { originalname, size, key, location: url = '' } = request.file;

        const { id } = request.user;

        const updateAvatarService = new UpdateAvatarService(await connection);

        const post = await updateAvatarService.execute({
            id,
            name: originalname,
            size,
            key,
            url,
        });

        return response.json(post);
    },
);

usersRouter.patch(
    '/updateUserProfile',
    ensureAuthenticated,
    async (request, response) => {
        try {
            const { id } = request.user;

            const {
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
            } = request.body;

            const updateProfileService = new UpdateProfileService(
                await connection,
            );

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
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

usersRouter.get('/', async (request, response) => {
    try {
        const usersRepository = getCustomRepository(UsersRepository);

        const listOfUsers = await usersRepository.find();

        const secureListOfUsers = listOfUsers.map(user => {
            delete user.password;
            return user;
        });

        return response.status(200).json(secureListOfUsers);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
