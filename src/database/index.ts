/* eslint-disable prettier/prettier */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
import { ConnectionOptions, createConnection } from 'typeorm';
import path from 'path';

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: 'hurrydbinstance2.c1ekyxn2vbik.us-east-2.rds.amazonaws.com',
    port: 5432,
    username: 'hurrydb',
    password: 'hurrydbpassword',
    database: 'hurrydb',
    entities: [
        path.resolve(__dirname + '/models/*.entity.js')


    ],

    migrations: ['./dist/database/**/migrations/*.js'],
    cli: {
        migrationsDir: './src/database/migrations',
        entitiesDir: './src/models',
    },
};

createConnection(connectionOptions).then(response => {
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
