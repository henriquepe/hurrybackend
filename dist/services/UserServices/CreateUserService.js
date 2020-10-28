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
/* eslint-disable no-useless-constructor */
const bcrypt_1 = require("bcrypt");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const UsersRepository_1 = __importDefault(require("../../repositories/UsersRepository"));
let CreateUserService = class CreateUserService {
    constructor(connection) {
        this.connection = connection;
        this.usersRepository = this.connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ name, email, password, avatar, musicInterest1_id, musicInterest2_id, musicInterest3_id, love, state, city, birthday, cpf, cellphone, }) {
        if (name === '' ||
            email === '' ||
            password === '' ||
            avatar === '' ||
            musicInterest1_id === '' ||
            musicInterest2_id === '' ||
            musicInterest3_id === '' ||
            love === null ||
            state === '' ||
            city === '' ||
            birthday === null ||
            cpf === '' ||
            cellphone === '') {
            throw new Error('Not suficient information to create an account, please fill all require information');
        }
        const checkIfUserAlreadyExists = await this.usersRepository.findOne({
            where: { email },
        });
        if (checkIfUserAlreadyExists) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt_1.hash(password, 8);
        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            avatar,
            musicInterest1_id,
            musicInterest2_id,
            musicInterest3_id,
            love,
            state,
            city,
            birthday,
            cpf,
            cellphone,
        });
        await this.usersRepository.save(user);
        return user;
    }
};
CreateUserService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], CreateUserService);
exports.default = CreateUserService;
