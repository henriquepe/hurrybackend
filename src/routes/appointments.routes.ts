import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import Appointment from '../models/Appointment.entity';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.post('/', ensureAuthenticated, async (request, response) => {
    const { provider_id, name, date, eventImage, tickets } = request.body;

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
        name,
        provider_id,
        date,
        eventImage,
        tickets,
    });

    return response.json(appointment);
});

appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
    const appointmentsRepository = getRepository(Appointment);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

export default appointmentsRouter;
