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
const crypto_1 = require("crypto");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
let ResetPasswordService = class ResetPasswordService {
    constructor(connection) {
        this.connection = connection;
        this.usersRepository = this.connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ email }) {
        const validUser = await this.usersRepository.findOne({
            where: { email },
        });
        if (!validUser) {
            throw new Error('this email does not belongs to any of our users');
        }
        const validUserNewPassword = crypto_1.createHash('md5').toString();
        validUser.password = validUserNewPassword;
        await this.usersRepository.save(validUser);
        return validUserNewPassword;
    }
};
ResetPasswordService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], ResetPasswordService);
exports.default = ResetPasswordService;
