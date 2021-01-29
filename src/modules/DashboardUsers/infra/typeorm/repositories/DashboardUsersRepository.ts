import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import DashboardUser from '../entities/DashboardUser.entity';

@Service()
@EntityRepository(DashboardUser)
// eslint-disable-next-line prettier/prettier
export default class DashboardUserRepository extends Repository<DashboardUser> { }
