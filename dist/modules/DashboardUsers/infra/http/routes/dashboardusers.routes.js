"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateDashboardUserService_1 = __importDefault(require("@modules/DashboardUsers/services/CreateDashboardUserService"));
const ListDashboardUsersService_1 = __importDefault(require("@modules/DashboardUsers/services/ListDashboardUsersService"));
const typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
const express_1 = require("express");
const dashboardUsersRouter = express_1.Router();
dashboardUsersRouter.post('/', async (request, response) => {
    const { name, avatar_url, email, password, sex, typeOfUser } = request.body;
    try {
        const createDashboardUsersService = new CreateDashboardUserService_1.default(await typeorm_1.default);
        const dashboardUser = await createDashboardUsersService.execute({
            name,
            avatar_url,
            email,
            password,
            sex,
            typeOfUser,
        });
        return response.status(200).json(dashboardUser);
    }
    catch (err) {
        return response.status(401).json({ error: err.message });
    }
});
dashboardUsersRouter.get('/', async (request, response) => {
    try {
        const listDashboardUsersService = new ListDashboardUsersService_1.default(await typeorm_1.default);
        const dashboardUsers = await listDashboardUsersService.execute();
        return response.status(200).json(dashboardUsers);
    }
    catch (err) {
        return response.status(401).json({ error: err.message });
    }
});
exports.default = dashboardUsersRouter;
//# sourceMappingURL=dashboardusers.routes.js.map