/* eslint-disable no-useless-constructor */
import { compare } from 'bcrypt';

import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';
import jwt from '@config/auth';
import DashboardUsersRepository from '../infra/typeorm/repositories/DashboardUsersRepository';
import DashboardUser from '../infra/typeorm/entities/DashboardUser.entity';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: DashboardUser;
    token: string;
}

@Service()
class DashboardAuthenticationService {
    // using constructor injection
    private dashboardUsersRepository: DashboardUsersRepository;

    constructor(private readonly connection: Connection) {
        this.dashboardUsersRepository = this.connection.getCustomRepository(
            DashboardUsersRepository,
        );
    }

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.dashboardUsersRepository.findOne({
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

export default DashboardAuthenticationService;
