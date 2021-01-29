import { compare, hash } from 'bcrypt';

import { Service } from 'typedi';
import { Connection } from 'typeorm';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';

interface Request {
    user_id: string;
    oldPassword: string;
    newPassword: string;
}

@Service()
class UpdateUserPasswordService {
    private usersRepository: UsersRepository;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getCustomRepository(
            UsersRepository,
        );
    }

    public async execute({
        user_id,
        oldPassword,
        newPassword,
    }: Request): Promise<void> {
        if (user_id === '' || oldPassword === '' || newPassword === '') {
            throw new Error(
                'Not suficiente information to change your password, please fill all required field',
            );
        }

        const user = await this.usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Invalid Token, user does not exists');
        }

        const verifyOldPasswordToCreateNewOne = await compare(
            oldPassword,
            user.password,
        );

        if (!verifyOldPasswordToCreateNewOne) {
            throw new Error(
                'Old password does not match, please reset your password',
            );
        }

        const hashedPassword = await hash(newPassword, 8);

        user.password = hashedPassword;

        await this.usersRepository.save(user);
    }
}

export default UpdateUserPasswordService;
