import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '@modules/Users/services/CreateUserService';
import UpdateAvatarService from '@modules/Users/services/UpdateAvatarService';
import ResetPasswordService from '@modules/Users/services/ResetPasswordService';
import SendNewPasswordByEmailService from '@modules/Users/services/SendNewPasswordByEmailService';
import UpdateUserPasswordService from '@modules/Users/services/UpdateUserPasswordService';
import UpdateProfileService from '@modules/Users/services/UpdateProfileService';
import ShowOneUserService from '@modules/Users/services/ShowOneUserService';
import DeleteUserService from '@modules/Users/services/DeleteUserService';
import ShowEventsAboutUserInterestService from '@modules/Users/services/ShowEventsAboutUserInterestService';
import ShowEventsWithEventTypeInteresOfUser from '@modules/Users/services/ShowEventsWithEventTypeInteresOfUser';
import multerConfig from '../../../../../config/multer';

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import connection from '../../../../../shared/infra/typeorm';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRouter = Router();

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
            sex,
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
            sex,
        });

        // @ts-ignore
        delete user.password;

        return response.status(200).json(user);
    } catch (err) {
        return response.status(400).json({
            error:
                'Something went wrong, we could not create your account right now, try again later',
            serverEerror: err.message,
        });
    }
});

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

        return response.status(200).json({
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
        // @ts-ignore
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
        try {
            const {
                originalname,
                size,
                key,
                location: url = '',
            } = request.file;

            const { id } = request.user;

            const updateAvatarService = new UpdateAvatarService(
                await connection,
            );

            const post = await updateAvatarService.execute({
                id,
                name: originalname,
                size,
                key,
                url,
            });

            return response.status(200).json(post);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
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
            // @ts-ignore
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
            // @ts-ignore
            delete user.password;
            return user;
        });

        return response.status(200).json(secureListOfUsers);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.delete('/deleteUser/:id', async (request, response) => {
    try {
        const deleteUserService = new DeleteUserService(await connection);

        const { id } = request.params;

        await deleteUserService.execute({ user_id: id });

        return response.status(200).json({ message: 'User sucessful deleted' });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.post(
    '/interests',
    ensureAuthenticated,
    async (request, response) => {
        try {
            const { id } = request.user;

            const showEventsAboutUserInterestService = new ShowEventsAboutUserInterestService(
                await connection,
            );

            const appointments = await showEventsAboutUserInterestService.execute(
                {
                    id,
                },
            );

            return response.status(200).json(appointments);
        } catch (err) {
            return response.status(400).json(err.message);
        }
    },
);

usersRouter.post('/eventTypes', async (request, response) => {
    try {
        const { eventType_id } = request.body;

        const showEventsWithEventTypeInteresOfUser = new ShowEventsWithEventTypeInteresOfUser(
            await connection,
        );

        const appointmentsFiltredWithEventType = await showEventsWithEventTypeInteresOfUser.execute(
            { eventType_id },
        );

        return response.status(200).json(appointmentsFiltredWithEventType);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
