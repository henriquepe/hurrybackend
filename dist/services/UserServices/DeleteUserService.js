"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRepository_1 = __importDefault(require("../../repositories/UsersRepository"));
class DeleteUserService {
    constructor(connection) {
        this.usersRepository = connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ user_id }) {
        const user = await this.usersRepository.findOne(user_id);
        if (!user) {
            throw new Error('User not found, incorrect ID');
        }
        await this.usersRepository.remove(user);
    }
}
exports.default = DeleteUserService;
