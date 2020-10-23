import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    name: string;
    provider_id: string;
    date: Date;
    eventImage: string;
    tickets: number;
}

export default class CreateAppointmentService {
    public async execute({
        name,
        date,
        provider_id,
        tickets,
        eventImage,
    }: Request): Promise<Appointment> {
        const appointmentsRepository = getConnection().getRepository(
            Appointment,
        );

        const appointment = appointmentsRepository.create({
            name,
            date,
            provider_id,
            tickets,
            eventImage,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}
