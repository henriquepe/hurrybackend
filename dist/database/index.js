"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const connectionOptions = {
    type: 'postgres',
    host: 'hurrydbinstance2.c1ekyxn2vbik.us-east-2.rds.amazonaws.com',
    port: 5432,
    username: 'hurrydb',
    password: 'hurrydbpassword',
    database: 'hurrydb',
    entities: [
        path_1.default.resolve(__dirname + '/models/*.entity.js')
    ],
    migrations: ['./dist/database/**/migrations/*.js'],
    cli: {
        migrationsDir: './src/database/migrations',
        entitiesDir: './src/models',
    },
};
typeorm_1.createConnection(connectionOptions).then(response => {
    return response.connect;
});
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
