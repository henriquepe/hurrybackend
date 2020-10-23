"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const User_entity_1 = __importDefault(require("../models/User.entity"));
class AuthenticationService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = typeorm_1.getRepository(User_entity_1.default);
            const user = yield usersRepository.findOne({
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
        });
    }
}
exports.default = AuthenticationService;
