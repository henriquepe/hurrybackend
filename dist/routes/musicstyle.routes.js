"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateMusicStyleService_1 = __importDefault(require("../services/CreateMusicStyleService"));
const database_1 = __importDefault(require("../database"));
const ListMusicStylesService_1 = __importDefault(require("../services/ListMusicStylesService"));
const musicstyleRouter = express_1.Router();
musicstyleRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;
        const createMusicStyleService = new CreateMusicStyleService_1.default(await database_1.default);
        const musicStyle = await createMusicStyleService.execute({ name });
        return response.status(200).json({ musicStyle });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
musicstyleRouter.get('/', async (request, response) => {
    try {
        const listMusicStylesService = new ListMusicStylesService_1.default(await database_1.default);
        const listOfMusicStyles = listMusicStylesService.execute();
        return response.status(200).json({ listOfMusicStyles });
    }
    catch {
        return response.status(400).json({
            error: 'We could not display the list right now, try again later',
        });
    }
});
exports.default = musicstyleRouter;
