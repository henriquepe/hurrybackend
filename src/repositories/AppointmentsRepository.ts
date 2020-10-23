import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment.entity';

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {}
