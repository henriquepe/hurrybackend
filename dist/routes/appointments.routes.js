"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const Appointment_entity_1 = __importDefault(require("../models/Appointment.entity"));
const CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
const appointmentsRouter = express_1.Router();
appointmentsRouter.post('/', EnsureAuthenticated_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { provider_id, name, date, eventImage, tickets } = request.body;
    const createAppointmentService = new CreateAppointmentService_1.default();
    const appointment = yield createAppointmentService.execute({
        name,
        provider_id,
        date,
        eventImage,
        tickets,
    });
    return response.json(appointment);
}));
appointmentsRouter.get('/', EnsureAuthenticated_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentsRepository = typeorm_1.getRepository(Appointment_entity_1.default);
    const appointments = yield appointmentsRepository.find();
    return response.json(appointments);
}));
exports.default = appointmentsRouter;
