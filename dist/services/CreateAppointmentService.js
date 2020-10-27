"use strict";
/* eslint-disable no-useless-constructor */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
let CreateAppointmentService = class CreateAppointmentService {
    constructor(connection) {
        this.connection = connection;
        this.appointmentsRepository = this.connection.getCustomRepository(AppointmentsRepository_1.default);
    }
    async execute({ name, date, provider_id, tickets, eventImage, musicstyle_id, }) {
        if (name === '' ||
            date === null ||
            provider_id === '' ||
            tickets === null ||
            eventImage === '' ||
            musicstyle_id === '') {
            throw new Error('Not suficient information to create an account, please fill all require information');
        }
        const appointment = await this.appointmentsRepository.create({
            name,
            date,
            provider_id,
            tickets,
            eventImage,
            musicstyle_id,
        });
        await this.appointmentsRepository.save(appointment);
        return appointment;
    }
};
CreateAppointmentService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], CreateAppointmentService);
exports.default = CreateAppointmentService;
