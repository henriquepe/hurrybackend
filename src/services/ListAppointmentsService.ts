/* eslint-disable no-useless-constructor */
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Connection, Repository } from 'typeorm';
import Appointment from '../models/Appointment.entity';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

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
