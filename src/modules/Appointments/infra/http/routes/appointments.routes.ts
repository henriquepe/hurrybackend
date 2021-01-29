import { Router } from 'express';
import multer from 'multer';
import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/Appointments/services/ListAppointmentsService';
import ShowOneAppointmentService from '@modules/Appointments/services/ShowOneAppointmentService';
import UpdateEventImageService from '@modules/Appointments/services/UpdateEventImageService';
import multerConfig from '@config/multer';
import connection from '@shared/infra/typeorm';
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/EnsureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.post('/', ensureAuthenticated, async (request, response) => {
    try {
        const {
            provider_id,
            name,
            date,
            eventImage,
            tickets,
            musicstyle_id,
            eventtype_id,
            state,
            city,
            street,
            artists_ids,
        } = request.body;

        const createAppointmentService = new CreateAppointmentService(
            await connection,
        );

        const appointment = await createAppointmentService.execute({
            name,
            provider_id,
            date,
            eventImage,
            tickets,
            musicstyle_id,
            eventtype_id,
            state,
            city,
            street,
            artists_ids,
        });

        return response.status(200).json(appointment);
    } catch (err) {
        return response.status(400).json({
            error: err.message,
        });
    }
});

// lembrar de incluir autenticação ensureAuthenticated

appointmentsRouter.get('/', async (request, response) => {
    try {
        const listAppointmentsService = new ListAppointmentsService(
            await connection,
        );

        const appointments = await listAppointmentsService.execute();

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

appointmentsRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const showOneAppointmentService = new ShowOneAppointmentService(
            await connection,
        );

        const appointment = await showOneAppointmentService.execute({
            appointment_id: id,
        });

        return response.status(200).json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

appointmentsRouter.post(
    '/uploadEventImage/:id',
    ensureAuthenticated,
    multer(multerConfig).single('avatar'),
    async (request, response) => {
        try {
            const {
                originalname,
                size,
                key,
                location: url = '',
            } = request.file;

            const { id } = request.params;

            const updateEventImageService = new UpdateEventImageService(
                await connection,
            );

            const post = await updateEventImageService.execute({
                id,
                name: originalname,
                size,
                key,
                url,
            });

            return response.status(200).json(post);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

export default appointmentsRouter;
