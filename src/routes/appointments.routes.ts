import { Router } from 'express';
import connection from '../database';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ListAppointmentsService from '../services/ListAppointmentsService';

const appointmentsRouter = Router();

appointmentsRouter.post('/', ensureAuthenticated, async (request, response) => {
    const { provider_id, name, date, eventImage, tickets } = request.body;

    const createAppointmentService = new CreateAppointmentService(
        await connection,
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

// lembrar de incluir autenticação ensureAuthenticated

appointmentsRouter.get('/', async (request, response) => {
    const createListAppointmentsService = new ListAppointmentsService(
        await connection,
    );

    const appointments = await createListAppointmentsService.execute();

    return response.json(appointments);
});

export default appointmentsRouter;
