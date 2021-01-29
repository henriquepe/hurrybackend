import { Connection } from 'typeorm';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';

interface Request {
    user_id: string;
}

class DeleteUserService {
    private usersRepository: UsersRepository;

    constructor(connection: Connection) {
        this.usersRepository = connection.getCustomRepository(UsersRepository);
    }

    public async execute({ user_id }: Request): Promise<void> {
        const user = await this.usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('User not found, incorrect ID');
        }

        await this.usersRepository.remove(user);
    }
}

export default DeleteUserService;
