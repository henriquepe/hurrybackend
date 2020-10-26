import { randomBytes } from 'crypto';
import { hash } from 'bcrypt';
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

        const randomTextToNewPassword = randomBytes(8);

        const randomTextToNewPasswordString = randomTextToNewPassword.toString();

        const hashedRandomTextToNewPassword = await hash(
            randomTextToNewPasswordString,
            8,
        );

        const validUserNewPassword = hashedRandomTextToNewPassword;

        validUser.password = validUserNewPassword;

        await this.usersRepository.save(validUser);

        return randomTextToNewPasswordString;
    }
}

export default ResetPasswordService;
