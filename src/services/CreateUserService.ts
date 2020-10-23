import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export default class CreateAppointmentService {
    public async execute({
        name,
        email,
        password,
        avatar,
    }: Request): Promise<User> {
        const usersRepository = getConnection(
            process.env.NODE_ENV,
        ).getRepository(User);

        const checkIfUserAlreadyExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkIfUserAlreadyExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });

        await usersRepository.save(user);

        return user;
    }
}
