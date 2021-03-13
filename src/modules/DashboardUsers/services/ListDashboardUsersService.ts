import { Connection } from 'typeorm';
import { Service } from 'typedi';
import DashboardUser from '../infra/typeorm/entities/DashboardUser.entity';
import DashboardUsersRepository from '../infra/typeorm/repositories/DashboardUsersRepository';

@Service()
export default class ListDashboardUsersService {
    private dashboardUserRepository: DashboardUsersRepository;

    constructor(private readonly connection: Connection) {
        this.dashboardUserRepository = this.connection.getCustomRepository(
            DashboardUsersRepository,
        );
    }

    public async execute(): Promise<DashboardUser[]> {
        const dashboardUsers = await this.dashboardUserRepository.find();

        return dashboardUsers;
    }
}
