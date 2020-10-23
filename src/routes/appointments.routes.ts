import { Router } from 'express';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ListAppointmentsService from '../services/ListAppointmentsService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', ensureAuthenticated, async (request, response) => {
    const { provider_id, name, date, eventImage, tickets } = request.body;

    const createAppointmentService = new CreateAppointmentService(
        appointmentsRepository,
    );

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
    const createListAppointmentsService = new ListAppointmentsService(
        appointmentsRepository,
    );

    const appointments = createListAppointmentsService.execute();

    return response.json(appointments);
});

export default appointmentsRouter;
