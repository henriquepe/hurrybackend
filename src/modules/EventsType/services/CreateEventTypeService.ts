import { Service } from 'typedi';
import { Connection } from 'typeorm';
import EventType from '@modules/EventsType/infra/typeorm/entities/EventType.entity';
import EventTypesRepository from '@modules/EventsType/infra/typeorm/repositories/EventTypesRepository';

interface Request {
    name: string;
}

@Service()
class CreateEventTypeService {
    private eventTypesRepository: EventTypesRepository;

    constructor(private readonly connection: Connection) {
        this.eventTypesRepository = this.connection.getCustomRepository(
            EventTypesRepository,
        );
    }

    public async execute({ name }: Request): Promise<EventType> {
        const nameOfTypeToLowerCase = name.toLowerCase();

        const verifyAlreadyExistanceOfEventType = await this.eventTypesRepository.findOne(
            { where: { name: nameOfTypeToLowerCase } },
        );

        if (verifyAlreadyExistanceOfEventType) {
            throw new Error('Event type already exists');
        }

        const eventType = this.eventTypesRepository.create({
            name: nameOfTypeToLowerCase,
        });

        await this.eventTypesRepository.save(eventType);

        return eventType;
    }
}

export default CreateEventTypeService;
