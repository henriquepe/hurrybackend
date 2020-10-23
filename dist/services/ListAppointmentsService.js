"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-constructor */
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
let ListAppointmentsService = class ListAppointmentsService {
    constructor(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    async execute() {
        const appointments = await this.appointmentsRepository.find();
        return appointments;
    }
};
ListAppointmentsService = __decorate([
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [AppointmentsRepository_1.default])
], ListAppointmentsService);
exports.default = ListAppointmentsService;