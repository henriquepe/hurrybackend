"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateMusicStyleService_1 = __importDefault(require("@modules/MusicsStyle/services/CreateMusicStyleService"));
const ListMusicStylesService_1 = __importDefault(require("@modules/MusicsStyle/services/ListMusicStylesService"));
const typeorm_1 = __importDefault(require("../../../../../shared/infra/typeorm"));
const musicstyleRouter = express_1.Router();
musicstyleRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;
        const createMusicStyleService = new CreateMusicStyleService_1.default(await typeorm_1.default);
        const musicStyle = await createMusicStyleService.execute({ name });
        return response.status(200).json({ musicStyle });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
musicstyleRouter.get('/', async (request, response) => {
    try {
        const listMusicStylesService = new ListMusicStylesService_1.default(await typeorm_1.default);
        const listOfMusicStyles = await listMusicStylesService.execute();
        return response.status(200).json({ listOfMusicStyles });
    }
    catch (_a) {
        return response.status(400).json({
            error: 'We could not display the list right now, try again later',
        });
    }
});
exports.default = musicstyleRouter;
//# sourceMappingURL=musicstyle.routes.js.map