"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
const typeorm_1 = require("typeorm");
const Appointment_entity_1 = __importDefault(require("../models/Appointment.entity"));
const User_entity_1 = __importDefault(require("../models/User.entity"));
const databaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection({
        type: 'postgres',
        host: 'hurrydbinstance2.c1ekyxn2vbik.us-east-2.rds.amazonaws.com',
        port: 5432,
        username: 'hurrydb',
        password: 'hurrydbpassword',
        database: 'hurrydb',
        entities: [
            // // eslint-disable-next-line global-require
            // require('../models/Appointment.entity'),
            // // eslint-disable-next-line global-require
            // require('../models/User.entity'),
            "./dist/models/*.js"
        ],
        migrationsRun: true,
        migrations: ['./dist/database/**/migrations/*.js'],
        cli: {
            migrationsDir: './src/database/migrations',
            entitiesDir: './src/models',
        },
    });
    const userRepository = connection.getRepository(User_entity_1.default);
    const appointmentsRepository = connection.getRepository(Appointment_entity_1.default);
    return connection;
});
databaseConnection();
// eslint-disable-next-line no-return-await
// {
//     "name": "hurrybankconnection",
//     "type": "postgres",
//     "database": "hurrydb",
//     "host": "hurrydbinstance2.c1ekyxn2vbik.us-east-2.rds.amazonaws.com",
//     "port": 5432,
//     "username": "hurrydb",
//     "password": "hurrydbpassword",
//     "entities": "./dist/models/**/*.js",
//     "migrations": [
//         "./dist/database/**/migrations/*.js"
//     ],
//     "cli": {
//         "migrationsDir": "./src/database/migrations",
//         "entitiesDir": "./src/models"
//     }
// }
