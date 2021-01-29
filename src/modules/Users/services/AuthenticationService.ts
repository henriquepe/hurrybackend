/* eslint-disable no-useless-constructor */
import { compare } from 'bcrypt';

import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';
import User from '@modules/Users/infra/typeorm/entities/User.entity';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';
import jwt from '@config/auth';

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
