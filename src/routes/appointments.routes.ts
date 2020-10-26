import { Router } from 'express';
import connection from '../database';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ListAppointmentsService from '../services/ListAppointmentsService';

const appointmentsRouter = Router();

appointmentsRouter.post('/', ensureAuthenticated, async (request, response) => {
    try {
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

        return response.status(200).json(appointment);
    } catch {
        return response.status(400).json({
            error: 'Your event could not be created, try again later.',
        });
    }
});

// lembrar de incluir autenticação ensureAuthenticated

appointmentsRouter.get('/', async (request, response) => {
    try {
        const createListAppointmentsService = new ListAppointmentsService(
            await connection,
        );

        const appointments = await createListAppointmentsService.execute();

        return response.status(200).json(appointments);
    } catch (err) {
        if (!err) {
            return response.status(400).json({
                error: 'Those events could not be listed now, try again later',
            });
        }

        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
