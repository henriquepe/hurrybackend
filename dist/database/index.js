"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-return-await */
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
// import Appointment from '../models/Appointment.entity';
// import User from '../models/User.entity';
typeorm_1.useContainer(typedi_1.Container);
const connection = typeorm_1.createConnection().then(async (response) => {
    return response;
});
exports.default = connection;
//
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
//
