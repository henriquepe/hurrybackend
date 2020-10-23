/* eslint-disable no-useless-constructor */

import { InjectRepository } from 'typeorm-typedi-extensions';
import Appointment from '../models/Appointment.entity';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    name: string;
    provider_id: string;
    date: Date;
    eventImage: string;
    tickets: number;
}

export default class CreateAppointmentService {
    constructor(
        @InjectRepository()
        private readonly appointmentsRepository: AppointmentsRepository,
    ) {}

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
