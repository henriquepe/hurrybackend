/* eslint-disable prettier/prettier */
module.exports = {
    "type": "postgres",
    "url": "postgres://hurrydb:hurrydatabase@hurrydb.cvx6sc53gqyv.us-east-2.rds.amazonaws.com:5432/postgres",
    // "type": "postgres",
    // "host": "hurrydb.cvx6sc53gqyv.us-east-2.rds.amazonaws.com",
    // "username": "hurrydb",
    // "password": "hurrydatabase",
    // "port": 5432,

    "entities": [
        "./dist/models/**/*.js",
        // "./src/models/**/*.ts"
    ],
    "migrations": [
        "./dist/database/**/migrations/*.js",
        // "./src/database/**/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./dist/models",
        // "entitiesDir": "./src/models"
    }
}
