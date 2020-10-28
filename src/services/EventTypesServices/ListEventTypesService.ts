import { Connection } from 'typeorm';
import EventType from '../../models/EventType.entity';
import EventTypesRepository from '../../repositories/EventTypesRepository';

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
