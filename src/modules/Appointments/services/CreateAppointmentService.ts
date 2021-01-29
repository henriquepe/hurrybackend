/* eslint-disable no-useless-constructor */

import { Service } from 'typedi';
import { Connection } from 'typeorm';
import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment.entity';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';

interface Request {
    name: string;
    provider_id: string;
    date: Date;
    eventImage: string;
    tickets: number;
    musicstyle_id: string;
    eventtype_id: string;
    state: string;
    city: string;
    street: string;
    artists_ids: string[];
}

@Service()
export default class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(private readonly connection: Connection) {
        this.appointmentsRepository = this.connection.getCustomRepository(
            AppointmentsRepository,
        );
    }

    public async execute({
        name,
        date,
        provider_id,
        tickets,
        eventImage,
        musicstyle_id,
        eventtype_id,
        state,
        city,
        street,
        artists_ids,
    }: Request): Promise<Appointment> {
        if (
            name === '' ||
            date === null ||
            provider_id === '' ||
            tickets === null ||
            eventImage === '' ||
            musicstyle_id === '' ||
            eventtype_id === '' ||
            state === '' ||
            city === '' ||
            street === ''
        ) {
            throw new Error(
                'Not suficient information to create an account, please fill all require information',
            );
        }

        const stateToLowerCase = state.toLowerCase();

        const cityToLowerCase = city.toLowerCase();

        const streetToLowerCase = street.toLowerCase();

        const appointment = this.appointmentsRepository.create({
            name,
            date,
            provider_id,
            tickets,
            eventImage,
            musicstyle_id,
            eventtype_id,
            state: stateToLowerCase,
            city: cityToLowerCase,
            street: streetToLowerCase,
            artists_ids,
        });

        await this.appointmentsRepository.save(appointment);

        return appointment;
    }
}
