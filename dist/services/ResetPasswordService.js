"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
class ResetPasswordService {
    constructor(connection) {
        this.connection = connection;
        this.usersRepository = this.connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ email }) {
        const validUser = await this.usersRepository.findOne({ where: email });
        if (!validUser) {
            throw new Error('this email does not belongs to any of our users');
        }
        const validUserNewPassword = crypto_1.createHash('sha256');
        validUser.password = String(validUserNewPassword);
        await this.usersRepository.save(validUser);
        return validUserNewPassword;
    }
}
exports.default = ResetPasswordService;
