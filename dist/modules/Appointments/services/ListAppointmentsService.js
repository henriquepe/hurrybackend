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
const AppointmentsRepository_1 = __importDefault(require("@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository"));
let ListAppointmentsService = class ListAppointmentsService {
    constructor(connection) {
        this.connection = connection;
        this.appointmentsRepository = this.connection.getCustomRepository(AppointmentsRepository_1.default);
    }
    async execute() {
        const appointments = await this.appointmentsRepository.find();
        return appointments;
    }
};
ListAppointmentsService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], ListAppointmentsService);
exports.default = ListAppointmentsService;
//# sourceMappingURL=ListAppointmentsService.js.map