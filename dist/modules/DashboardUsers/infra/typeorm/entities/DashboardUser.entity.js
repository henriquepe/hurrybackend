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
const Post_entity_1 = __importDefault(require("@modules/Posts/infra/typeorm/entities/Post.entity"));
const typeorm_1 = require("typeorm");
let DashboardUser = class DashboardUser {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], DashboardUser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], DashboardUser.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], DashboardUser.prototype, "typeOfUser", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], DashboardUser.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], DashboardUser.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('uuid'),
    __metadata("design:type", String)
], DashboardUser.prototype, "avatar_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Post_entity_1.default),
    typeorm_1.JoinColumn({ name: 'avatar_id' }),
    __metadata("design:type", String)
], DashboardUser.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], DashboardUser.prototype, "avatar_url", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], DashboardUser.prototype, "sex", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], DashboardUser.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], DashboardUser.prototype, "updated_at", void 0);
DashboardUser = __decorate([
    typeorm_1.Entity('dashboardUsers')
], DashboardUser);
exports.default = DashboardUser;
//# sourceMappingURL=DashboardUser.entity.js.map