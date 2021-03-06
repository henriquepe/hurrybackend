import { Router } from 'express';
import AuthenticationService from '@modules/Users/services/AuthenticationService';
import connection from '../../../../../shared/infra/typeorm';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticationService(await connection);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        // @ts-ignore
        delete user.password;

        return response.status(200).json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
