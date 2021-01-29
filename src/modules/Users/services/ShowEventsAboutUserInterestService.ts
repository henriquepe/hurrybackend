import { Connection, getCustomRepository } from 'typeorm';
import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment.entity';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';

interface Request {
    id: string;
}

class ShowEventsAboutUserInterestService {
    private usersRepository: UsersRepository;

    constructor(connection: Connection) {
        this.usersRepository = connection.getCustomRepository(UsersRepository);
    }

    public async execute({ id }: Request): Promise<Appointment[]> {
        try {
            const user = await this.usersRepository.findOne({ id });

            const appointmentsRepository = getCustomRepository(
                AppointmentsRepository,
            );

            if (!user) {
                throw new Error(
                    'User not found, incorrect ID, what about your JWT token?',
                );
            }

            const appointments = await appointmentsRepository.find();

            const appointmentsAboutUserInterest = appointments.filter(
                appointment => {
                    return (
                        appointment.musicstyle_id === user.musicInterest1_id ||
                        appointment.musicstyle_id === user.musicInterest2_id ||
                        appointment.musicstyle_id === user.musicInterest3_id
                    );
                },
            );

            // const appointments = appointmentsRepository.findByIds([
            //     `${user.musicInterest1_id}`,
            //     `${user.musicInterest2_id}`,
            //     `${user.musicInterest3_id}`,
            // ]);

            if (!appointmentsAboutUserInterest) {
                throw new Error(
                    'Appointments with these music interest not found',
                );
            }

            return appointmentsAboutUserInterest;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export default ShowEventsAboutUserInterestService;
