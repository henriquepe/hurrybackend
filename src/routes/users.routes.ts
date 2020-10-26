import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';
import connection from '../database';
import ResetPasswordService from '../services/ResetPasswordService';
import SendNewPasswordByEmailService from '../services/SendNewPasswordByEmailService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password, avatar } = request.body;

        const createUserService = new CreateUserService(await connection);

        const user = await createUserService.execute({
            name,
            email,
            password,
            avatar,
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

export default usersRouter;
