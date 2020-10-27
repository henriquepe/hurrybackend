/* eslint-disable no-useless-concat */
/* eslint-disable no-path-concat */
/* eslint-disable no-useless-constructor */
import path from 'path';
import fs from 'fs';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Connection, Repository } from 'typeorm';
import User from '../models/User.entity';

import uploadConfig from '../config/upload';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
    user_id: string;
    avatarFilename: string;
}

@Service()
class UpdateAvatarService {
    private usersRepository: UsersRepository;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getCustomRepository(
            UsersRepository,
        );
    }

    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const user = await this.usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar');
        }

        const { directory } = uploadConfig;

        // eslint-disable-next-line prefer-template
        // eslint-disable-next-line no-useless-concat
        // eslint-disable-next-line prefer-template
        // await fs.promises.mkdir(__dirname + '..' + '..' + 'tmp');

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
