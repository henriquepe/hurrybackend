import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import Drink from '../models/Drink.entity';

@Service()
@EntityRepository(Drink)
export default class DrinksRepository extends Repository<Drink> {}
