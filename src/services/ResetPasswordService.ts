import { createHash, Hash } from 'crypto';
import { Connection } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
    email: string;
}

class ResetPasswordService {
    private usersRepository: UsersRepository;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getCustomRepository(
            UsersRepository,
        );
    }

    public async execute({ email }: Request): Promise<Hash> {
        const validUser = await this.usersRepository.findOne({ where: email });

        if (!validUser) {
            throw new Error('this email does not belongs to any of our users');
        }

        const validUserNewPassword = createHash('sha256');

        validUser.password = String(validUserNewPassword);

        await this.usersRepository.save(validUser);

        return validUserNewPassword;
    }
}

export default ResetPasswordService;
