"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const User_1 = __importDefault(require("../models/User"));
const upload_1 = __importDefault(require("../config/upload"));
class UpdateAvatarService {
    async execute({ user_id, avatarFilename }) {
        const usersRepository = typeorm_1.getConnection().getRepository(User_1.default);
        const user = await usersRepository.findOne(user_id);
        if (!user) {
            throw new Error('Only authenticated users can change avatar');
        }
        const { directory } = upload_1.default;
        if (user.avatar) {
            const userAvatarFilePath = path_1.default.join(directory, user.avatar);
            const userAvatarFileExists = await fs_1.default.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs_1.default.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;
        await usersRepository.save(user);
        return user;
    }
}
exports.default = UpdateAvatarService;
