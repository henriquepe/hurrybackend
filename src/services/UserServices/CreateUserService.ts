/* eslint-disable no-useless-constructor */
import { hash } from 'bcrypt';

import { Service } from 'typedi';
import { Connection } from 'typeorm';
import User from '../../models/User.entity';
import UsersRepository from '../../repositories/UsersRepository';

interface Request {
    name: string;
    email: string;
    password: string;
    avatar: string;
    musicInterest1_id: string;
    musicInterest2_id: string;
    musicInterest3_id: string;
    love: boolean;
    state: string;
    city: string;
    birthday: Date;
    cpf: string;
    cellphone: string;
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
        musicInterest1_id,
        musicInterest2_id,
        musicInterest3_id,
        love,
        state,
        city,
        birthday,
        cpf,
        cellphone,
    }: Request): Promise<User> {
        if (
            name === '' ||
            email === '' ||
            password === '' ||
            musicInterest1_id === '' ||
            musicInterest2_id === '' ||
            musicInterest3_id === '' ||
            love === null ||
            state === '' ||
            city === '' ||
            birthday === null ||
            cpf === '' ||
            cellphone === ''
        ) {
            throw new Error(
                'Not suficient information to create an account, please fill all require information',
            );
        }

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
            musicInterest1_id,
            musicInterest2_id,
            musicInterest3_id,
            love,
            state,
            city,
            birthday,
            cpf,
            cellphone,
        });

        await this.usersRepository.save(user);

        delete user.password;

        return user;
    }
}
