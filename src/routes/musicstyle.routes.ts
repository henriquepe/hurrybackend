import { Router } from 'express';
import CreateMusicStyleService from '../services/CreateMusicStyleService';
import connection from '../database';

const musicstyleRouter = Router();

musicstyleRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;

        const createMusicStyleService = new CreateMusicStyleService(
            await connection,
        );

        const musicStyle = createMusicStyleService.execute({ name });

        return response.status(200).json({ musicStyle });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default musicstyleRouter;
