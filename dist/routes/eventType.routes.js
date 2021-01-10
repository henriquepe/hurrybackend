"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateEventTypeService_1 = __importDefault(require("../services/EventTypesServices/CreateEventTypeService"));
const database_1 = __importDefault(require("../database"));
const ListEventTypesService_1 = __importDefault(require("../services/EventTypesServices/ListEventTypesService"));
const eventTypeRouter = express_1.Router();
eventTypeRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;
        const createEventTypeService = new CreateEventTypeService_1.default(await database_1.default);
        const eventType = await createEventTypeService.execute({ name });
        return response.status(200).json(eventType);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
eventTypeRouter.get('/', async (request, response) => {
    try {
        const listEventTypesService = new ListEventTypesService_1.default(await database_1.default);
        const list = await listEventTypesService.execute();
        return response.status(200).json({ list });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = eventTypeRouter;
