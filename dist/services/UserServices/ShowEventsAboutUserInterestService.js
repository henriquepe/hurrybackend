"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppointmentsRepository_1 = __importDefault(require("../../repositories/AppointmentsRepository"));
const UsersRepository_1 = __importDefault(require("../../repositories/UsersRepository"));
class ShowEventsAboutUserInterestService {
    constructor(connection) {
        this.usersRepository = connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ id }) {
        try {
            const user = await this.usersRepository.findOne({ id });
            const appointmentsRepository = typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
            if (!user) {
                throw new Error('User not found, incorrect ID, what about your JWT token?');
            }
            const appointments = await appointmentsRepository.find();
            const appointmentsAboutUserInterest = appointments.filter(appointment => {
                return (appointment.musicstyle_id === user.musicInterest1_id ||
                    appointment.musicstyle_id === user.musicInterest2_id ||
                    appointment.musicstyle_id === user.musicInterest3_id);
            });
            // const appointments = appointmentsRepository.findByIds([
            //     `${user.musicInterest1_id}`,
            //     `${user.musicInterest2_id}`,
            //     `${user.musicInterest3_id}`,
            // ]);
            if (!appointmentsAboutUserInterest) {
                throw new Error('Appointments with these music interest not found');
            }
            return appointmentsAboutUserInterest;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}
exports.default = ShowEventsAboutUserInterestService;
