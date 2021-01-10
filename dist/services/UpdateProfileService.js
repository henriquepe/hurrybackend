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
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
let UpdateProfileService = class UpdateProfileService {
    constructor(connection) {
        this.connection = connection;
        this.usersRepository = this.connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ id, name, email, musicinterest1_id, musicinterest2_id, musicinterest3_id, love, state, city, birthday, cpf, cellphone, }) {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new Error('This user does not exists');
        }
        user.name = name;
        user.email = email;
        user.musicInterest1_id = musicinterest1_id;
        user.musicInterest2_id = musicinterest2_id;
        user.musicInterest3_id = musicinterest3_id;
        user.love = love;
        user.state = state;
        user.city = city;
        user.birthday = birthday;
        user.cpf = cpf;
        user.cellphone = cellphone;
        await this.usersRepository.save(user);
        return user;
    }
};
UpdateProfileService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], UpdateProfileService);
exports.default = UpdateProfileService;
