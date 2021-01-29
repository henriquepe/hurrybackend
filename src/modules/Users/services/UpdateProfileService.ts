import { Service } from 'typedi';
import { Connection } from 'typeorm';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';
import User from '@modules/Users/infra/typeorm/entities/User.entity';

interface Request {
    id: string;
    name: string;
    email: string;
    musicinterest1_id: string;
    musicinterest2_id: string;
    musicinterest3_id: string;
    love: boolean;
    state: string;
    city: string;
    birthday: Date;
    cpf: string;
    cellphone: string;
}

@Service()
class UpdateProfileService {
    private usersRepository: UsersRepository;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getCustomRepository(
            UsersRepository,
        );
    }

    public async execute({
        id,
        name,
        email,
        musicinterest1_id,
        musicinterest2_id,
        musicinterest3_id,
        love,
        state,
        city,
        birthday,
        cpf,
        cellphone,
    }: Request): Promise<User> {
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new Error('This user does not exists');
        }

        user.name = name;
        user.email = email;
        user.musicInterest1_id = musicinterest1_id;
        user.musicInterest2_id = musicinterest2_id;
        user.musicInterest3_id = musicinterest3_id;
        user.love = love;
        user.state = state;
        user.city = city;
        user.birthday = birthday;
        user.cpf = cpf;
        user.cellphone = cellphone;

        await this.usersRepository.save(user);

        // @ts-ignore
        delete user.password;

        return user;
    }
}

export default UpdateProfileService;
