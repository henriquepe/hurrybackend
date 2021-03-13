import { Router } from 'express';
import DashboardAuthenticationService from '@modules/DashboardUsers/services/DashboardAuthenticationService';
import connection from '../../../../../shared/infra/typeorm';

const dashboardSessionsRouter = Router();

dashboardSessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new DashboardAuthenticationService(
            await connection,
        );

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

export default dashboardSessionsRouter;
