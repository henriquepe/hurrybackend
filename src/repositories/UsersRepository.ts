import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import User from '../models/User.entity';

@Service()
@EntityRepository(User)
export default class UsersRepository extends Repository<User> {}
