"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRepository_1 = __importDefault(require("@modules/Users/infra/typeorm/repositories/UsersRepository"));
class ShowOneUserService {
    constructor(connection) {
        this.usersRepository = connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ user_id }) {
        const user = await this.usersRepository.findOne(user_id);
        if (!user) {
            throw new Error('User not found, incorrect ID');
        }
        return user;
    }
}
exports.default = ShowOneUserService;
//# sourceMappingURL=ShowOneUserService.js.map