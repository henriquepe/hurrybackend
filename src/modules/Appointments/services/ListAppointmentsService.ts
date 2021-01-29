/* eslint-disable no-useless-constructor */

import { Service } from 'typedi';
import { Connection } from 'typeorm';
import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment.entity';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';

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
