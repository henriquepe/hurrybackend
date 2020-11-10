import { Connection } from 'typeorm';
import User from '../../models/User.entity';
import UsersRepository from '../../repositories/UsersRepository';

interface Request {
    user_id: string;
}

class ShowOneUserService {
    usersRepository: UsersRepository;

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
