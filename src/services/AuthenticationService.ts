/* eslint-disable no-useless-constructor */
import { compare } from 'bcrypt';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { sign } from 'jsonwebtoken';
import jwt from '../config/auth';
import User from '../models/User.entity';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticationService {
    // using constructor injection
    constructor(
        @InjectRepository()
        private readonly usersRepository: UsersRepository,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('email or password invalid');
        }

        const verifyPassword = compare(password, user.password);

        if (!verifyPassword) {
            throw new Error('email or password invalid');
        }

        const { secret, expiresIn } = jwt.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticationService;
