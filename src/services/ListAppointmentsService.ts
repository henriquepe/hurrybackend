/* eslint-disable no-useless-constructor */
import { InjectRepository } from 'typeorm-typedi-extensions';
import Appointment from '../models/Appointment.entity';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

export default class ListAppointmentsService {
    constructor(
        @InjectRepository()
        private readonly appointmentsRepository: AppointmentsRepository,
    ) {}

    public async execute(): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.find();

        return appointments;
    }
}
