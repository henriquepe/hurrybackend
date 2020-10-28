import { Router } from 'express';
import CreateEventTypeService from '../services/EventTypesServices/CreateEventTypeService';
import connection from '../database';
import ListEventTypesService from '../services/EventTypesServices/ListEventTypesService';

const eventTypeRouter = Router();

eventTypeRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;

        const createEventTypeService = new CreateEventTypeService(
            await connection,
        );

        const eventType = await createEventTypeService.execute({ name });

        return response.status(200).json(eventType);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

eventTypeRouter.get('/', async (request, response) => {
    try {
        const listEventTypesService = new ListEventTypesService(
            await connection,
        );

        const list = await listEventTypesService.execute();

        return response.status(200).json({ list });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default eventTypeRouter;
