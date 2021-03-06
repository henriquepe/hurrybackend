"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateAppointmentService_1 = __importDefault(require("@modules/Appointments/services/CreateAppointmentService"));
const ListAppointmentsService_1 = __importDefault(require("@modules/Appointments/services/ListAppointmentsService"));
const ShowOneAppointmentService_1 = __importDefault(require("@modules/Appointments/services/ShowOneAppointmentService"));
const UpdateEventImageService_1 = __importDefault(require("@modules/Appointments/services/UpdateEventImageService"));
const multer_2 = __importDefault(require("@config/multer"));
const typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
const EnsureAuthenticated_1 = __importDefault(require("@modules/Users/infra/http/middlewares/EnsureAuthenticated"));
const appointmentsRouter = express_1.Router();
appointmentsRouter.post('/', EnsureAuthenticated_1.default, async (request, response) => {
    try {
        const { provider_id, name, date, eventImage, tickets, musicstyle_id, eventtype_id, state, city, street, artists_ids, } = request.body;
        const createAppointmentService = new CreateAppointmentService_1.default(await typeorm_1.default);
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
        const listAppointmentsService = new ListAppointmentsService_1.default(await typeorm_1.default);
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
        const showOneAppointmentService = new ShowOneAppointmentService_1.default(await typeorm_1.default);
        const appointment = await showOneAppointmentService.execute({
            appointment_id: id,
        });
        return response.status(200).json(appointment);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
appointmentsRouter.post('/uploadEventImage/:id', EnsureAuthenticated_1.default, multer_1.default(multer_2.default).single('avatar'), async (request, response) => {
    try {
        const { originalname, size, key, location: url = '', } = request.file;
        const { id } = request.params;
        const updateEventImageService = new UpdateEventImageService_1.default(await typeorm_1.default);
        const post = await updateEventImageService.execute({
            id,
            name: originalname,
            size,
            key,
            url,
        });
        return response.status(200).json(post);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = appointmentsRouter;
//# sourceMappingURL=appointments.routes.js.map