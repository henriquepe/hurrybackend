import { Connection } from 'typeorm';
import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment.entity';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';

interface Request {
    appointment_id: string;
}

class ShowOneAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(private readonly connection: Connection) {
        this.appointmentsRepository = this.connection.getCustomRepository(
            AppointmentsRepository,
        );
    }

    public async execute({ appointment_id }: Request): Promise<Appointment> {
        const appointment = await this.appointmentsRepository.findOne(
            appointment_id,
        );

        if (!appointment) {
            throw new Error('Appointment not found, incorrect ID');
        }

        return appointment;
    }
}

export default ShowOneAppointmentService;
