/* eslint-disable no-useless-constructor */
import path from 'path';
import fs from 'fs';
import { InjectRepository } from 'typeorm-typedi-extensions';
import User from '../models/User.entity';

import uploadConfig from '../config/upload';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateAvatarService {
    constructor(
        @InjectRepository()
        private readonly usersRepository: UsersRepository,
    ) {}

    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const user = await this.usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar');
        }

        const { directory } = uploadConfig;

        if (user.avatar) {
            const userAvatarFilePath = path.join(directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateAvatarService;
