"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Appointment_1 = __importDefault(require("../models/Appointment"));
class CreateAppointmentService {
    async execute({ name, date, provider_id, tickets, eventImage, }) {
        const appointmentsRepository = typeorm_1.getConnection().getRepository(Appointment_1.default);
        const appointment = appointmentsRepository.create({
            name,
            date,
            provider_id,
            tickets,
            eventImage,
        });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}
exports.default = CreateAppointmentService;
