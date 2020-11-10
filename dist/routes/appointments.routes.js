"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const CreateAppointmentService_1 = __importDefault(require("../services/AppointmentsServices/CreateAppointmentService"));
const ListAppointmentsService_1 = __importDefault(require("../services/AppointmentsServices/ListAppointmentsService"));
const ShowOneAppointmentService_1 = __importDefault(require("../services/AppointmentsServices/ShowOneAppointmentService"));
const appointmentsRouter = express_1.Router();
appointmentsRouter.post('/', EnsureAuthenticated_1.default, async (request, response) => {
    try {
        const { provider_id, name, date, eventImage, tickets, musicstyle_id, eventtype_id, state, city, street, artists_ids, } = request.body;
        const createAppointmentService = new CreateAppointmentService_1.default(await database_1.default);
        const appointment = await createAppointmentService.execute({
            name,
            provider_id,
            date,
            eventImage,
            tickets,
            musicstyle_id,
            eventtype_id,
            state,
            city,
            street,
            artists_ids,
        });
        return response.status(200).json(appointment);
    }
    catch (err) {
        return response.status(400).json({
            error: err.message,
        });
    }
});
// lembrar de incluir autenticação ensureAuthenticated
appointmentsRouter.get('/', async (request, response) => {
    try {
        const listAppointmentsService = new ListAppointmentsService_1.default(await database_1.default);
        const appointments = await listAppointmentsService.execute();
        return response.status(200).json(appointments);
    }
    catch (err) {
        if (!err) {
            return response.status(400).json({
                error: 'Those events could not be listed now, try again later',
            });
        }
        return response.status(400).json({ error: err.message });
    }
});
appointmentsRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const showOneAppointmentService = new ShowOneAppointmentService_1.default(await database_1.default);
        const appointment = await showOneAppointmentService.execute({
            appointment_id: id,
        });
        return response.status(200).json(appointment);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = appointmentsRouter;
