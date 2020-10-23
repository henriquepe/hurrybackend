/* eslint-disable prettier/prettier */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
import {  createConnection, ConnectionManager } from 'typeorm';
import Appointment from '../models/Appointment.entity';
import User from '../models/User.entity';




const databaseConnection = async() => {

    const connection =

    await createConnection({
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
})

    const userRepository = connection.getRepository(User);
    const appointmentsRepository = connection.getRepository(Appointment);





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
