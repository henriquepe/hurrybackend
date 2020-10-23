"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
const CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
const appointmentsRouter = express_1.Router();
appointmentsRouter.post('/', EnsureAuthenticated_1.default, async (request, response) => {
    const { provider_id, name, date, eventImage, tickets } = request.body;
    const createAppointmentService = new CreateAppointmentService_1.default();
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
    const appointmentsRepository = typeorm_1.getConnection().getRepository(Appointment_1.default);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});
exports.default = appointmentsRouter;
