/* eslint-disable no-useless-constructor */
import { compare } from 'bcrypt';

import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';
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

@Service()
class AuthenticationService {
    // using constructor injection
    private usersRepository: UsersRepository;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getCustomRepository(
            UsersRepository,
        );
    }

    public async execute({ email, password }: Request): Promise<Response> {
        console.log(email);

        const user = await this.usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('email or password invalid');
        }

        const verifyPassword = await compare(password, user.password);

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
