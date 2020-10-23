/* eslint-disable */
module.exports = {

    "type": "postgres",
    "database": "hurrydb",
    "host": "hurrydbinstance2.c1ekyxn2vbik.us-east-2.rds.amazonaws.com",
    "port": 5432,
    "username": "hurrydb",
    "password": "hurrydbpassword",
    "entities": "./dist/models/**/*.js",
    "migrations": ["./dist/database/**/migrations/*.js"],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/models"
    },
};
