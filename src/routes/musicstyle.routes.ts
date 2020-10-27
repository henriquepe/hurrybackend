import { Router } from 'express';
import CreateMusicStyleService from '../services/CreateMusicStyleService';
import connection from '../database';
import ListMusicStyleService from '../services/ListMusicStylesService';

const musicstyleRouter = Router();

musicstyleRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;

        const createMusicStyleService = new CreateMusicStyleService(
            await connection,
        );

        const musicStyle = await createMusicStyleService.execute({ name });

        return response.status(200).json({ musicStyle });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

musicstyleRouter.get('/', async (request, response) => {
    try {
        const listMusicStylesService = new ListMusicStyleService(
            await connection,
        );

        const listOfMusicStyles = await listMusicStylesService.execute();

        return response.status(200).json({ listOfMusicStyles });
    } catch {
        return response.status(400).json({
            error: 'We could not display the list right now, try again later',
        });
    }
});

export default musicstyleRouter;
