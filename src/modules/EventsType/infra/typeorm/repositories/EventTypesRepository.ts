import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import EventType from '../entities/EventType.entity';

@Service()
@EntityRepository(EventType)
// eslint-disable-next-line prettier/prettier
export default class EventTypesRepository extends Repository<EventType> { }
