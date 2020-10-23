/* eslint-disable no-useless-constructor */

import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Connection, Repository } from 'typeorm';
import Appointment from '../models/Appointment.entity';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    name: string;
    provider_id: string;
    date: Date;
    eventImage: string;
    tickets: number;
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
    }: Request): Promise<Appointment> {
        const appointment = this.appointmentsRepository.create({
            name,
            date,
            provider_id,
            tickets,
            eventImage,
        });

        await this.appointmentsRepository.save(appointment);

        return appointment;
    }
}
