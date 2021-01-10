"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const CreateDrinkService_1 = __importDefault(require("../services/DrinksServices/CreateDrinkService"));
const ListDrinksService_1 = __importDefault(require("../services/DrinksServices/ListDrinksService"));
const drinksRouter = express_1.Router();
drinksRouter.post('/', async (request, response) => {
    try {
        const { name, product_brand, quantity } = request.body;
        const createDrinkService = new CreateDrinkService_1.default(await database_1.default);
        const drink = await createDrinkService.execute({
            name,
            product_brand,
            quantity,
        });
        return response.status(200).json({ drink });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
drinksRouter.get('/', async (request, response) => {
    try {
        const listDrinksService = new ListDrinksService_1.default(await database_1.default);
        const listOfDrinks = await listDrinksService.execute();
        return response.status(200).json({ listOfDrinks });
    }
    catch {
        return response.status(400).json({
            error: 'We could not display the list right now, try again later',
        });
    }
});
exports.default = drinksRouter;
