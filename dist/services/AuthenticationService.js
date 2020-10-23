"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const User_1 = __importDefault(require("../models/User"));
class AuthenticationService {
    async execute({ email, password }) {
        const usersRepository = typeorm_1.getConnection('hurrybankconnection').getRepository(User_1.default);
        const user = await usersRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new Error('email or password invalid');
        }
        const verifyPassword = bcrypt_1.compare(password, user.password);
        if (!verifyPassword) {
            throw new Error('email or password invalid');
        }
        const { secret, expiresIn } = auth_1.default.jwt;
        const token = jsonwebtoken_1.sign({}, secret, {
            subject: user.id,
            expiresIn,
        });
        return {
            user,
            token,
        };
    }
}
exports.default = AuthenticationService;
