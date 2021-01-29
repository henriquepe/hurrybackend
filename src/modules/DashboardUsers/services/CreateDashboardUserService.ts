import { Connection } from 'typeorm';
import { Service } from 'typedi';
import { hash } from 'bcrypt';
import DashboardUser from '../infra/typeorm/entities/DashboardUser.entity';
import DashboardUsersRepository from '../infra/typeorm/repositories/DashboardUsersRepository';

interface Request {
    name: string;
    typeOfUser: string;
    email: string;
    password: string;
    avatar_url?: string;
    sex: 'male' | 'female';
}

@Service()
export default class CreateDashboardUserService {
    private dashboardUserRepository: DashboardUsersRepository;

    constructor(private readonly connection: Connection) {
        this.dashboardUserRepository = this.connection.getCustomRepository(
            DashboardUsersRepository,
        );
    }

    public async execute({
        name,
        avatar_url,
        email,
        password,
        sex,
        typeOfUser,
    }: Request): Promise<DashboardUser> {
        const typeOfUserToLowerCase = typeOfUser.toLowerCase();

        if (
            (typeOfUserToLowerCase !== 'fornecedor' &&
                typeOfUserToLowerCase !== 'administrador') ||
            (sex !== 'female' && sex !== 'male')
        ) {
            throw new Error(
                'Not suficient (or incorrect) information to create an account, please fill all require information',
            );
        }

        const dashboardUserExists = await this.dashboardUserRepository.findOne({
            where: { email },
        });

        if (dashboardUserExists) {
            throw new Error('dashboardUser already exists');
        }

        const hashedPassword = await hash(password, 8);

        const dashboardUser = this.dashboardUserRepository.create({
            name,
            password: hashedPassword,
            email,
            sex,
            typeOfUser: typeOfUserToLowerCase,
            avatar_url,
        });

        await this.dashboardUserRepository.save(dashboardUser);

        return dashboardUser;
    }
}
