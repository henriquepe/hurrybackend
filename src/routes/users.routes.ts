import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';
import connection from '../database';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password, avatar } = request.body;

    const createUserService = new CreateUserService(await connection);

    const user = await createUserService.execute({
        name,
        email,
        password,
        avatar,
    });

    return response.json(user);
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

export default usersRouter;
