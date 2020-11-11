import { id } from 'date-fns/locale';
import { Connection, getCustomRepository } from 'typeorm';
import Appointment from '../../models/Appointment.entity';
import AppointmentsRepository from '../../repositories/AppointmentsRepository';
import EventTypesRepository from '../../repositories/EventTypesRepository';

interface Request {
    eventType_id: string;
}

class ShowEventsWithEventTypeInteresOfUser {
    private appointmentsRepository: AppointmentsRepository;

    constructor(private readonly connection: Connection) {
        this.appointmentsRepository = this.connection.getCustomRepository(
            AppointmentsRepository,
        );
    }

    public async execute({ eventType_id }: Request): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.find();

        const eventTypeRepository = getCustomRepository(EventTypesRepository);

        if (eventType_id === null) {
            throw new Error('event type id is missing');
        }

        const eventTypeWithGivenEventTypeID = await eventTypeRepository.findOne(
            { where: { id: eventType_id } },
        );

        if (!eventTypeWithGivenEventTypeID) {
            throw new Error('event type does not exists');
        }

        const findAppointmentsFiltredWithEventType = appointments.filter(
            appointment => {
                return appointment.eventtype_id === eventType_id;
            },
        );

        if (!findAppointmentsFiltredWithEventType) {
            throw new Error('Appointments with this event type not found');
        }

        return findAppointmentsFiltredWithEventType;
    }
}

export default ShowEventsWithEventTypeInteresOfUser;
