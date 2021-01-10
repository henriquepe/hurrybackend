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
const EventType_entity_1 = __importDefault(require("./EventType.entity"));
const MusicStyle_entity_1 = __importDefault(require("./MusicStyle.entity"));
const Post_entity_1 = __importDefault(require("./Post.entity"));
const User_entity_1 = __importDefault(require("./User.entity"));
let Appointment = class Appointment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Appointment.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Appointment.prototype, "provider_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_entity_1.default),
    typeorm_1.JoinColumn({ name: 'provider_id' }),
    __metadata("design:type", String)
], Appointment.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", Array)
], Appointment.prototype, "artists_ids", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Appointment.prototype, "musicstyle_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => MusicStyle_entity_1.default),
    typeorm_1.JoinColumn({ name: 'musicstyle_id' }),
    __metadata("design:type", String)
], Appointment.prototype, "musicstyle", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Appointment.prototype, "eventtype_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => EventType_entity_1.default),
    typeorm_1.JoinColumn({ name: 'eventtype_id' }),
    __metadata("design:type", String)
], Appointment.prototype, "eventtype", void 0);
__decorate([
    typeorm_1.Column('timestamp with time zone'),
    __metadata("design:type", Date)
], Appointment.prototype, "date", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Appointment.prototype, "eventImage_url", void 0);
__decorate([
    typeorm_1.Column('uuid'),
    __metadata("design:type", String)
], Appointment.prototype, "eventImage_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Post_entity_1.default),
    typeorm_1.JoinColumn({ name: 'eventImage_id' }),
    __metadata("design:type", String)
], Appointment.prototype, "eventImage", void 0);
__decorate([
    typeorm_1.Column('numeric'),
    __metadata("design:type", Number)
], Appointment.prototype, "tickets", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Appointment.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Appointment.prototype, "city", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Appointment.prototype, "street", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Number)
], Appointment.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Number)
], Appointment.prototype, "updated_at", void 0);
Appointment = __decorate([
    typeorm_1.Entity('appointments')
], Appointment);
exports.default = Appointment;
