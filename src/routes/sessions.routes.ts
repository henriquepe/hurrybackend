import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import AuthenticationService from '../services/AuthenticationService';

const sessionsRouter = Router();

const usersRepository = new UsersRepository();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticationService(usersRepository);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return response.status(200).json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
