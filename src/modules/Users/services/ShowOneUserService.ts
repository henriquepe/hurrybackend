import { Connection } from 'typeorm';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';
import User from '@modules/Users/infra/typeorm/entities/User.entity';

interface Request {
    user_id: string;
}

class ShowOneUserService {
    private usersRepository: UsersRepository;

    constructor(connection: Connection) {
        this.usersRepository = connection.getCustomRepository(UsersRepository);
    }

    public async execute({ user_id }: Request): Promise<User> {
        const user = await this.usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('User not found, incorrect ID');
        }

        return user;
    }
}

export default ShowOneUserService;
