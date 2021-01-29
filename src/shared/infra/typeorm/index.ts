/* eslint-disable no-return-await */
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

// import Appointment from '../models/Appointment.entity';
// import User from '../models/User.entity';

useContainer(Container);
const connection = createConnection().then(async response => {
    return response;
});

export default connection;

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
