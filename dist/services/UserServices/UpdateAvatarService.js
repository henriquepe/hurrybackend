"use strict";
/* eslint-disable no-useless-concat */
/* eslint-disable no-path-concat */
/* eslint-disable no-useless-constructor */
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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const UsersRepository_1 = __importDefault(require("../../repositories/UsersRepository"));
const Post_entity_1 = __importDefault(require("../../models/Post.entity"));
let UpdateAvatarService = class UpdateAvatarService {
    constructor(connection) {
        this.connection = connection;
        this.usersRepository = this.connection.getCustomRepository(UsersRepository_1.default);
    }
    async execute({ id, name, key, size, url }) {
        const user = await this.usersRepository.findOne(id);
        const postsRepository = typeorm_1.getRepository(Post_entity_1.default, 'default');
        const s3 = new aws_sdk_1.default.S3();
        if (user) {
            const avatarOfUser = await postsRepository.findOne({
                where: { id: user.avatar_id },
            });
            if (avatarOfUser) {
                const avatarKey = await postsRepository.findOne({
                    where: { key: avatarOfUser.key },
                });
                if (avatarKey) {
                    s3.deleteObject({
                        Bucket: 'hurryawsbucket',
                        Key: `${avatarKey.key}`,
                    }).promise();
                }
            }
        }
        if (!user) {
            throw new Error('Only authenticated users can upload their avatars');
        }
        const post = postsRepository.create({
            name,
            size,
            key,
            url,
        });
        await postsRepository.save(post);
        const alreadyCreatedPost = await postsRepository.findOne({
            where: { key },
        });
        if (alreadyCreatedPost) {
            user.avatar_id = alreadyCreatedPost.id;
            user.avatar_url = alreadyCreatedPost.url;
            this.usersRepository.save(user);
        }
        else {
            throw new Error('Post not found');
        }
        await this.usersRepository.save(user);
        return post;
    }
};
UpdateAvatarService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], UpdateAvatarService);
exports.default = UpdateAvatarService;
