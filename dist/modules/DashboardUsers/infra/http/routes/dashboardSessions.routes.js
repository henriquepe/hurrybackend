"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DashboardAuthenticationService_1 = __importDefault(require("@modules/DashboardUsers/services/DashboardAuthenticationService"));
const typeorm_1 = __importDefault(require("../../../../../shared/infra/typeorm"));
const dashboardSessionsRouter = express_1.Router();
dashboardSessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const authenticateUser = new DashboardAuthenticationService_1.default(await typeorm_1.default);
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        // @ts-ignore
        delete user.password;
        return response.status(200).json({ user, token });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = dashboardSessionsRouter;
//# sourceMappingURL=dashboardSessions.routes.js.map