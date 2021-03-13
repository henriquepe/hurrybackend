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
const DashboardUsersRepository_1 = __importDefault(require("../infra/typeorm/repositories/DashboardUsersRepository"));
let ListDashboardUsersService = class ListDashboardUsersService {
    constructor(connection) {
        this.connection = connection;
        this.dashboardUserRepository = this.connection.getCustomRepository(DashboardUsersRepository_1.default);
    }
    async execute() {
        const dashboardUsers = await this.dashboardUserRepository.find();
        return dashboardUsers;
    }
};
ListDashboardUsersService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], ListDashboardUsersService);
exports.default = ListDashboardUsersService;
//# sourceMappingURL=ListDashboardUsersService.js.map