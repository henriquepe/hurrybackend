/* eslint-disable prettier/prettier */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    // "type": "postgres",
    // "url":
    //     "postgres://hurrydb:hurrydatabase@hurrydb.cvx6sc53gqyv.us-east-2.rds.amazonaws.com:5432/hurrydb",
    "type": "postgres",
    "host": "hurrydb.cvx6sc53gqyv.us-east-2.rds.amazonaws.com",
    "database": "postgres",
    "username": "hurrydb",
    "password": "hurrydatabase",
    "port": 5432,

    "entities": [
        // eslint-disable-next-line no-path-concat
        // eslint-disable-next-line no-useless-concat

        "dist/models/**/*.js",
        // "./src/models/**/*.ts"
        // User,
        // Appointment,
        // Post,
        // MusicStyle,
        // Drink,
        // EventType
    ],
    "migrations": [
        "./dist/database/**/migrations/*.js",
        // "./src/database/**/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": [
            // './dist/models',
            // eslint-disable-next-line no-useless-concat
            "dist/models/"
        ],
        // "entitiesDir": "./src/models"
    },
};
