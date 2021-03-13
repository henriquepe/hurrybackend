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
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const bcrypt_1 = require("bcrypt");
const DashboardUsersRepository_1 = __importDefault(require("../infra/typeorm/repositories/DashboardUsersRepository"));
let CreateDashboardUserService = class CreateDashboardUserService {
    constructor(connection) {
        this.connection = connection;
        this.dashboardUserRepository = this.connection.getCustomRepository(DashboardUsersRepository_1.default);
    }
    async execute({ name, avatar_url, email, password, sex, typeOfUser, }) {
        const typeOfUserToLowerCase = typeOfUser.toLowerCase();
        if ((typeOfUserToLowerCase !== 'fornecedor' &&
            typeOfUserToLowerCase !== 'administrador') ||
            (sex !== 'feminino' && sex !== 'masculino')) {
            throw new Error('Not suficient (or incorrect) information to create an account, please fill all require information');
        }
        const dashboardUserExists = await this.dashboardUserRepository.findOne({
            where: { email },
        });
        if (dashboardUserExists) {
            throw new Error('dashboardUser already exists');
        }
        const hashedPassword = await bcrypt_1.hash(password, 8);
        const dashboardUser = this.dashboardUserRepository.create({
            name,
            password: hashedPassword,
            email,
            sex,
            typeOfUser: typeOfUserToLowerCase,
            avatar_url,
        });
        await this.dashboardUserRepository.save(dashboardUser);
        return dashboardUser;
    }
};
CreateDashboardUserService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], CreateDashboardUserService);
exports.default = CreateDashboardUserService;
//# sourceMappingURL=CreateDashboardUserService.js.map