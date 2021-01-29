"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateDrinkService_1 = __importDefault(require("@modules/Drinks/services/CreateDrinkService"));
const ListDrinksService_1 = __importDefault(require("@modules/Drinks/services/ListDrinksService"));
const typeorm_1 = __importDefault(require("../../../../../shared/infra/typeorm"));
const drinksRouter = express_1.Router();
drinksRouter.post('/', async (request, response) => {
    try {
        const { name, product_brand, quantity } = request.body;
        const createDrinkService = new CreateDrinkService_1.default(await typeorm_1.default);
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
        const listDrinksService = new ListDrinksService_1.default(await typeorm_1.default);
        const listOfDrinks = await listDrinksService.execute();
        return response.status(200).json({ listOfDrinks });
    }
    catch (_a) {
        return response.status(400).json({
            error: 'We could not display the list right now, try again later',
        });
    }
});
exports.default = drinksRouter;
//# sourceMappingURL=drinks.routes.js.map