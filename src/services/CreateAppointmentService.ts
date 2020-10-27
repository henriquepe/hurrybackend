/* eslint-disable no-useless-constructor */

import { Service } from 'typedi';
import { Connection } from 'typeorm';
import Appointment from '../models/Appointment.entity';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    name: string;
    provider_id: string;
    date: Date;
    eventImage: string;
    tickets: number;
    musicstyle_id: string;
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
    }: Request): Promise<Appointment> {
        if (
            name === '' ||
            date === null ||
            provider_id === '' ||
            tickets === null ||
            eventImage === '' ||
            musicstyle_id === ''
        ) {
            throw new Error(
                'Not suficient information to create an account, please fill all require information',
            );
        }

        const appointment = await this.appointmentsRepository.create({
            name,
            date,
            provider_id,
            tickets,
            eventImage,
            musicstyle_id,
        });

        await this.appointmentsRepository.save(appointment);

        return appointment;
    }
}
