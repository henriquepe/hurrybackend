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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-constructor */
const bcrypt_1 = require("bcrypt");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
let AuthenticationService = class AuthenticationService {
    // using constructor injection
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ email, password }) {
        const user = await this.usersRepository.findOne({
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
};
AuthenticationService = __decorate([
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [UsersRepository_1.default])
], AuthenticationService);
exports.default = AuthenticationService;
