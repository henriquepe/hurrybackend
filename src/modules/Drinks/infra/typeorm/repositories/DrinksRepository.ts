import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import Drink from '../entities/Drink.entity';

@Service()
@EntityRepository(Drink)
// eslint-disable-next-line prettier/prettier
export default class DrinksRepository extends Repository<Drink> { }
