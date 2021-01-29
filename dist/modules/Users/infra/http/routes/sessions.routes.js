"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthenticationService_1 = __importDefault(require("@modules/Users/services/AuthenticationService"));
const typeorm_1 = __importDefault(require("../../../../../shared/infra/typeorm"));
const sessionsRouter = express_1.Router();
sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const authenticateUser = new AuthenticationService_1.default(await typeorm_1.default);
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
exports.default = sessionsRouter;
//# sourceMappingURL=sessions.routes.js.map