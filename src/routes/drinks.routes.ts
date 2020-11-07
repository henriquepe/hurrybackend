import { Router } from 'express';
import connection from '../database';
import CreateDrinkService from '../services/DrinksServices/CreateDrinkService';
import ListDrinksService from '../services/DrinksServices/ListDrinksService';

const drinksRouter = Router();

drinksRouter.post('/', async (request, response) => {
    try {
        const { name, product_brand, quantity } = request.body;

        const createDrinkService = new CreateDrinkService(await connection);

        const drink = await createDrinkService.execute({
            name,
            product_brand,
            quantity,
        });

        return response.status(200).json({ drink });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

drinksRouter.get('/', async (request, response) => {
    try {
        const listDrinksService = new ListDrinksService(await connection);

        const listOfDrinks = await listDrinksService.execute();

        return response.status(200).json({ listOfDrinks });
    } catch {
        return response.status(400).json({
            error: 'We could not display the list right now, try again later',
        });
    }
});

export default drinksRouter;
