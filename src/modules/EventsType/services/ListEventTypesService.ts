import { Connection } from 'typeorm';
import EventType from '@modules/EventsType/infra/typeorm/entities/EventType.entity';
import EventTypesRepository from '@modules/EventsType/infra/typeorm/repositories/EventTypesRepository';

class ListEventTypesService {
    private eventTypesRepository: EventTypesRepository;

    constructor(private readonly connection: Connection) {
        this.eventTypesRepository = this.connection.getCustomRepository(
            EventTypesRepository,
        );
    }

    public async execute(): Promise<EventType[]> {
        const list = this.eventTypesRepository.find();

        return list;
    }
}

export default ListEventTypesService;
