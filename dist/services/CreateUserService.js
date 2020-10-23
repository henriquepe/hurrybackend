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
const User_entity_1 = __importDefault(require("../models/User.entity"));
class CreateAppointmentService {
    execute({ name, email, password, avatar, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = typeorm_1.getRepository(User_entity_1.default);
            const checkIfUserAlreadyExists = yield usersRepository.findOne({
                where: { email },
            });
            if (checkIfUserAlreadyExists) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield bcrypt_1.hash(password, 8);
            const user = usersRepository.create({
                name,
                email,
                password: hashedPassword,
                avatar,
            });
            yield usersRepository.save(user);
            return user;
        });
    }
}
exports.default = CreateAppointmentService;
