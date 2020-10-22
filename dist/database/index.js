/* eslint-disable */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
typeorm_1.createConnection({
    type: 'postgres',
    host: 'hurrydbinstance2.c1ekyxn2vbik.us-east-2.rds.amazonaws.com',
    port: 5432,
    username: 'hurrydb',
    password: 'hurrydbpassword',
    entities: ['../models/*.js'],
    migrations: ['./migrations/*.js'],
    cli: {
        migrationsDir: './migrations',
    },
});
