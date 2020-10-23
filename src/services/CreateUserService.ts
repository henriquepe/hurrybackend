/* eslint-disable no-useless-constructor */
import { hash } from 'bcrypt';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Connection, Repository } from 'typeorm';
import User from '../models/User.entity';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

@Service()
export default class CreateUserService {
    private usersRepository: UsersRepository;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getCustomRepository(
            UsersRepository,
        );
    }

    public async execute({
        name,
        email,
        password,
        avatar,
    }: Request): Promise<User> {
        const checkIfUserAlreadyExists = await this.usersRepository.findOne({
            where: { email },
        });

        if (checkIfUserAlreadyExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hash(password, 8);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });

        await this.usersRepository.save(user);

        return user;
    }
}
