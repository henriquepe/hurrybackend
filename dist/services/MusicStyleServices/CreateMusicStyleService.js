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
const MusicStylesRepository_1 = __importDefault(require("../../repositories/MusicStylesRepository"));
let CreateMusicStyleService = class CreateMusicStyleService {
    constructor(connection) {
        this.connection = connection;
        this.musicstylesRepository = this.connection.getCustomRepository(MusicStylesRepository_1.default);
    }
    async execute({ name }) {
        const nameToLowerCase = name.toLowerCase();
        const verifyAlreadyExistanceOfMusicStyle = await this.musicstylesRepository.findOne({ where: { name: nameToLowerCase } });
        if (verifyAlreadyExistanceOfMusicStyle) {
            throw new Error('This music style already exists');
        }
        const musicStyle = await this.musicstylesRepository.create({
            name: nameToLowerCase,
        });
        await this.musicstylesRepository.save(musicStyle);
        return musicStyle;
    }
};
CreateMusicStyleService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], CreateMusicStyleService);
exports.default = CreateMusicStyleService;
