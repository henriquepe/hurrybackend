import { getConnection, getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import jwt from '../config/auth';
import User from '../models/User.entity';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticationService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
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
