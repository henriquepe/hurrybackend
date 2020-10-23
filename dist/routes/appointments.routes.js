"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
const ListAppointmentsService_1 = __importDefault(require("../services/ListAppointmentsService"));
const appointmentsRouter = express_1.Router();
appointmentsRouter.post('/', EnsureAuthenticated_1.default, async (request, response) => {
    const { provider_id, name, date, eventImage, tickets } = request.body;
    const createAppointmentService = new CreateAppointmentService_1.default(await database_1.default);
    const appointment = await createAppointmentService.execute({
        name,
        provider_id,
        date,
        eventImage,
        tickets,
    });
    return response.json(appointment);
});
appointmentsRouter.get('/', EnsureAuthenticated_1.default, async (request, response) => {
    const createListAppointmentsService = new ListAppointmentsService_1.default(await database_1.default);
    const appointments = await createListAppointmentsService.execute();
    return response.json(appointments);
});
exports.default = appointmentsRouter;
