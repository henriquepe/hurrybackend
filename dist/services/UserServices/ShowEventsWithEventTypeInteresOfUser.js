"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppointmentsRepository_1 = __importDefault(require("../../repositories/AppointmentsRepository"));
const EventTypesRepository_1 = __importDefault(require("../../repositories/EventTypesRepository"));
class ShowEventsWithEventTypeInteresOfUser {
    constructor(connection) {
        this.connection = connection;
        this.appointmentsRepository = this.connection.getCustomRepository(AppointmentsRepository_1.default);
    }
    async execute({ eventType_id }) {
        const appointments = await this.appointmentsRepository.find();
        const eventTypeRepository = typeorm_1.getCustomRepository(EventTypesRepository_1.default);
        if (eventType_id === null) {
            throw new Error('event type id is missing');
        }
        const eventTypeWithGivenEventTypeID = await eventTypeRepository.findOne({ where: { id: eventType_id } });
        if (!eventTypeWithGivenEventTypeID) {
            throw new Error('event type does not exists');
        }
        const findAppointmentsFiltredWithEventType = appointments.filter(appointment => {
            return appointment.eventtype_id === eventType_id;
        });
        if (!findAppointmentsFiltredWithEventType) {
            throw new Error('Appointments with this event type not found');
        }
        return findAppointmentsFiltredWithEventType;
    }
}
exports.default = ShowEventsWithEventTypeInteresOfUser;
