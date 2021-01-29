"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DrinksRepository_1 = __importDefault(require("@modules/Drinks/infra/typeorm/repositories/DrinksRepository"));
class ListDrinksService {
    constructor(connection) {
        this.connection = connection;
        this.drinksRepository = this.connection.getCustomRepository(DrinksRepository_1.default);
    }
    async execute() {
        const list = await this.drinksRepository.find();
        return list;
    }
}
exports.default = ListDrinksService;
//# sourceMappingURL=ListDrinksService.js.map