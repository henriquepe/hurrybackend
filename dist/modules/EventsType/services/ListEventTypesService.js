"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventTypesRepository_1 = __importDefault(require("@modules/EventsType/infra/typeorm/repositories/EventTypesRepository"));
class ListEventTypesService {
    constructor(connection) {
        this.connection = connection;
        this.eventTypesRepository = this.connection.getCustomRepository(EventTypesRepository_1.default);
    }
    async execute() {
        const list = this.eventTypesRepository.find();
        return list;
    }
}
exports.default = ListEventTypesService;
//# sourceMappingURL=ListEventTypesService.js.map