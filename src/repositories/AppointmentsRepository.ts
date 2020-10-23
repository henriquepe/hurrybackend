import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import Appointment from '../models/Appointment.entity';

@Service()
@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {}
