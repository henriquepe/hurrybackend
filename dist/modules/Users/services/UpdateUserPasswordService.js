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
const bcrypt_1 = require("bcrypt");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const UsersRepository_1 = __importDefault(require("@modules/Users/infra/typeorm/repositories/UsersRepository"));
let UpdateUserPasswordService = class UpdateUserPasswordService {
    constructor(connection) {
        this.connection = connection;
        this.usersRepository = this.connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ user_id, oldPassword, newPassword, }) {
        if (user_id === '' || oldPassword === '' || newPassword === '') {
            throw new Error('Not suficiente information to change your password, please fill all required field');
        }
        const user = await this.usersRepository.findOne(user_id);
        if (!user) {
            throw new Error('Invalid Token, user does not exists');
        }
        const verifyOldPasswordToCreateNewOne = await bcrypt_1.compare(oldPassword, user.password);
        if (!verifyOldPasswordToCreateNewOne) {
            throw new Error('Old password does not match, please reset your password');
        }
        const hashedPassword = await bcrypt_1.hash(newPassword, 8);
        user.password = hashedPassword;
        await this.usersRepository.save(user);
    }
};
UpdateUserPasswordService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], UpdateUserPasswordService);
exports.default = UpdateUserPasswordService;
//# sourceMappingURL=UpdateUserPasswordService.js.map