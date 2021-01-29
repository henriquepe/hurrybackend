import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import User from '../entities/User.entity';

@Service()
@EntityRepository(User)
// eslint-disable-next-line prettier/prettier
export default class UsersRepository extends Repository<User> { }
