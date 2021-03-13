import CreateDashboardUserService from '@modules/DashboardUsers/services/CreateDashboardUserService';
import ListDashboardUsersService from '@modules/DashboardUsers/services/ListDashboardUsersService';
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

dashboardUsersRouter.get('/', async (request, response) => {
    try {
        const listDashboardUsersService = new ListDashboardUsersService(
            await connection,
        );

        const dashboardUsers = await listDashboardUsersService.execute();

        return response.status(200).json(dashboardUsers);
    } catch (err) {
        return response.status(401).json({ error: err.message });
    }
});

export default dashboardUsersRouter;
