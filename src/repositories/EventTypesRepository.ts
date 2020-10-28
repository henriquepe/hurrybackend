import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import EventType from '../models/EventType.entity';

@Service()
@EntityRepository(EventType)
export default class EventTypesRepository extends Repository<EventType> {}
