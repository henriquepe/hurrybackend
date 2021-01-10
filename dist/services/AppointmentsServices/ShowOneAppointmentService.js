"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppointmentsRepository_1 = __importDefault(require("../../repositories/AppointmentsRepository"));
class ShowOneAppointmentService {
    constructor(connection) {
        this.connection = connection;
        this.appointmentsRepository = this.connection.getCustomRepository(AppointmentsRepository_1.default);
    }
    async execute({ appointment_id }) {
        const appointment = await this.appointmentsRepository.findOne(appointment_id);
        if (!appointment) {
            throw new Error('Appointment not found, incorrect ID');
        }
        return appointment;
    }
}
exports.default = ShowOneAppointmentService;
