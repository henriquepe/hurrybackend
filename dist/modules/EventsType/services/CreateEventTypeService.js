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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const EventTypesRepository_1 = __importDefault(require("@modules/EventsType/infra/typeorm/repositories/EventTypesRepository"));
let CreateEventTypeService = class CreateEventTypeService {
    constructor(connection) {
        this.connection = connection;
        this.eventTypesRepository = this.connection.getCustomRepository(EventTypesRepository_1.default);
    }
    async execute({ name }) {
        const nameOfTypeToLowerCase = name.toLowerCase();
        const verifyAlreadyExistanceOfEventType = await this.eventTypesRepository.findOne({ where: { name: nameOfTypeToLowerCase } });
        if (verifyAlreadyExistanceOfEventType) {
            throw new Error('Event type already exists');
        }
        const eventType = this.eventTypesRepository.create({
            name: nameOfTypeToLowerCase,
        });
        await this.eventTypesRepository.save(eventType);
        return eventType;
    }
};
CreateEventTypeService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], CreateEventTypeService);
exports.default = CreateEventTypeService;
//# sourceMappingURL=CreateEventTypeService.js.map