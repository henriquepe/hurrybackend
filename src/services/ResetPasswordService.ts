import { createHash } from 'crypto';
import { Service } from 'typedi';
import { Connection } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
    email: string;
}

@Service()
class ResetPasswordService {
    private usersRepository: UsersRepository;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getCustomRepository(
            UsersRepository,
        );
    }

    public async execute({ email }: Request): Promise<string> {
        const validUser = await this.usersRepository.findOne({
            where: { email },
        });

        if (!validUser) {
            throw new Error('this email does not belongs to any of our users');
        }

        const validUserNewPassword = createHash('md5').toString();

        validUser.password = validUserNewPassword;

        await this.usersRepository.save(validUser);

        return validUserNewPassword;
    }
}

export default ResetPasswordService;
