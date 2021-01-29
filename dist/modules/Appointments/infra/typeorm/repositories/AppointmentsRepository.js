"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const Appointment_entity_1 = __importDefault(require("../entities/Appointment.entity"));
let AppointmentsRepository = 
// eslint-disable-next-line prettier/prettier
class AppointmentsRepository extends typeorm_1.Repository {
};
AppointmentsRepository = __decorate([
    typedi_1.Service(),
    typeorm_1.EntityRepository(Appointment_entity_1.default)
    // eslint-disable-next-line prettier/prettier
], AppointmentsRepository);
exports.default = AppointmentsRepository;
//# sourceMappingURL=AppointmentsRepository.js.map