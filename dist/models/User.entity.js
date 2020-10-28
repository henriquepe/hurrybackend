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
const MusicStyle_entity_1 = __importDefault(require("./MusicStyle.entity"));
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('boolean'),
    __metadata("design:type", Boolean)
], User.prototype, "love", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    typeorm_1.Column('date'),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "cellphone", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "musicInterest1_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => MusicStyle_entity_1.default),
    typeorm_1.JoinColumn({ name: 'musicInterest1_id' }),
    __metadata("design:type", String)
], User.prototype, "musicinterest1", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "musicInterest2_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => MusicStyle_entity_1.default),
    typeorm_1.JoinColumn({ name: 'musicInterest2_id' }),
    __metadata("design:type", String)
], User.prototype, "musicinterest2", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "musicInterest3_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => MusicStyle_entity_1.default),
    typeorm_1.JoinColumn({ name: 'musicInterest3_id' }),
    __metadata("design:type", String)
], User.prototype, "musicinterest3", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.default = User;
