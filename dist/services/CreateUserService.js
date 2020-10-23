"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const User_1 = __importDefault(require("../models/User"));
class CreateAppointmentService {
    async execute({ name, email, password, avatar, }) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const checkIfUserAlreadyExists = await usersRepository.findOne({
            where: { email },
        });
        if (checkIfUserAlreadyExists) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt_1.hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });
        await usersRepository.save(user);
        return user;
    }
}
exports.default = CreateAppointmentService;
