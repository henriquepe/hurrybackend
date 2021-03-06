/* eslint-disable no-useless-concat */
/* eslint-disable no-path-concat */
/* eslint-disable no-useless-constructor */

import { Service } from 'typedi';
import { Connection, getRepository } from 'typeorm';

import AWS from 'aws-sdk';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';
import Post from '@modules/Posts/infra/typeorm/entities/Post.entity';

let bucket = '';

if (process.env.NODE_ENV === 'development') {
    bucket = process.env.BUCKET_DEVELOPMENT as string;
} else {
    bucket = process.env.BUCKET_PRODUCTION as string;
}

interface Request {
    id: string;
    name: string;
    size: number;
    key: string;
    url: string;
}

@Service()
class UpdateAvatarService {
    private usersRepository: UsersRepository;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getCustomRepository(
            UsersRepository,
        );
    }

    public async execute({ id, name, key, size, url }: Request): Promise<Post> {
        const user = await this.usersRepository.findOne(id);

        const postsRepository = getRepository(Post, 'default');

        const s3 = new AWS.S3();

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
                        Bucket: bucket,
                        Key: `${avatarKey.key}`,
                    }).promise();
                }
            }
        }

        if (!user) {
            throw new Error(
                'Only authenticated users can upload their avatars',
            );
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
        } else {
            throw new Error('Post not found');
        }

        await this.usersRepository.save(user);

        return post;
    }
}

export default UpdateAvatarService;
