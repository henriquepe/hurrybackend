"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
const typeorm_1 = require("typeorm");
const connectionOptions = {
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
};
const connection = async () => { await typeorm_1.createConnection(connectionOptions); };
connection();
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
