"use strict";
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
const databaseConnection = async () => {
    const connection = await typeorm_1.createConnection({
        type: 'postgres',
        host: 'hurrydbinstance2.c1ekyxn2vbik.us-east-2.rds.amazonaws.com',
        port: 5432,
        username: 'hurrydb',
        password: 'hurrydbpassword',
        database: 'hurrydb',
        entities: [
            User_entity_1.default,
            Appointment_entity_1.default
        ],
        migrations: ['./dist/database/**/migrations/*.js'],
        cli: {
            migrationsDir: './src/database/migrations',
            entitiesDir: './dist/models',
        },
    });
    const userRepository = connection.getRepository(User_entity_1.default);
    const appointmentsRepository = connection.getRepository(Appointment_entity_1.default);
    return connection;
};
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
