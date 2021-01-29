import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import Appointment from '../entities/Appointment.entity';

@Service()
@EntityRepository(Appointment)
// eslint-disable-next-line prettier/prettier
export default class AppointmentsRepository extends Repository<Appointment> { }
