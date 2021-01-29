import CreateDashboardUserService from '@modules/DashboardUsers/services/CreateDashboardUserService';
import connection from '@shared/infra/typeorm';
import { Router } from 'express';

const dashboardUsersRouter = Router();

dashboardUsersRouter.post('/', async (request, response) => {
    const { name, avatar_url, email, password, sex, typeOfUser } = request.body;

    try {
        const createDashboardUsersService = new CreateDashboardUserService(
            await connection,
        );

        const dashboardUser = await createDashboardUsersService.execute({
            name,
            avatar_url,
            email,
            password,
            sex,
            typeOfUser,
        });

        return response.status(200).json(dashboardUser);
    } catch (err) {
        return response.status(401).json({ error: err.message });
    }
});

export default dashboardUsersRouter;
