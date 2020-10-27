"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateMusicStyleService_1 = __importDefault(require("../services/CreateMusicStyleService"));
const database_1 = __importDefault(require("../database"));
const musicstyleRouter = express_1.Router();
musicstyleRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;
        const createMusicStyleService = new CreateMusicStyleService_1.default(await database_1.default);
        const musicStyle = createMusicStyleService.execute({ name });
        return response.status(200).json({ musicStyle });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = musicstyleRouter;
