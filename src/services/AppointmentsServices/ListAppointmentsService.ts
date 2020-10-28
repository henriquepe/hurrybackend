/* eslint-disable no-useless-constructor */

import { Service } from 'typedi';
import { Connection } from 'typeorm';
import Appointment from '../../models/Appointment.entity';
import AppointmentsRepository from '../../repositories/AppointmentsRepository';

@Service()
export default class ListAppointmentsService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(private readonly connection: Connection) {
        this.appointmentsRepository = this.connection.getCustomRepository(
            AppointmentsRepository,
        );
    }

    public async execute(): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.find();

        return appointments;
    }
}
