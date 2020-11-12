/* eslint-disable prettier/prettier */
module.exports = {


    "type": "postgres",
    "host": "hurrydbinstance.c1ekyxn2vbik.us-east-2.rds.amazonaws.com",
    "username": "hurrydb",
    "password": "hurrydbpassword",
    "port": 5432,

    "entities": [
        "./dist/models/**/*.js"
    ],
    "migrations": [
        "./dist/database/**/migrations/*.js"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./dist/models"
    }
}
