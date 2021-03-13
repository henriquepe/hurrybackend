"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_routes_1 = __importDefault(require("@modules/Appointments/infra/http/routes/appointments.routes"));
const drinks_routes_1 = __importDefault(require("@modules/Drinks/infra/http/routes/drinks.routes"));
const eventType_routes_1 = __importDefault(require("@modules/EventsType/infra/http/routes/eventType.routes"));
const musicstyle_routes_1 = __importDefault(require("@modules/MusicsStyle/infra/http/routes/musicstyle.routes"));
const sessions_routes_1 = __importDefault(require("@modules/Users/infra/http/routes/sessions.routes"));
const users_routes_1 = __importDefault(require("@modules/Users/infra/http/routes/users.routes"));
const dashboardusers_routes_1 = __importDefault(require("@modules/DashboardUsers/infra/http/routes/dashboardusers.routes"));
const dashboardSessions_routes_1 = __importDefault(require("@modules/DashboardUsers/infra/http/routes/dashboardSessions.routes"));
const routes = express_1.Router();
routes.use('/appointments', appointments_routes_1.default);
routes.use('/users', users_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
routes.use('/music', musicstyle_routes_1.default);
routes.use('/eventType', eventType_routes_1.default);
routes.use('/drinks', drinks_routes_1.default);
routes.use('/dashboardUsers', dashboardusers_routes_1.default);
routes.use('/dashboardSessions', dashboardSessions_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map