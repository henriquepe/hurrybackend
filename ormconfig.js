/* eslint-disable prettier/prettier */
module.exports = {
    // "type": "postgres",
    // "url": "postgres://tbcwrcxxioxpva:49d6d2c87395a25218e22bd4bea7678fe26408b0cd91f9d35204410e26da4e6a@ec2-23-23-242-234.compute-1.amazonaws.com:5432/d5fgb7sl44hsau",
    "type": "postgres",
    "host": "hurrydb.cvx6sc53gqyv.us-east-2.rds.amazonaws.com",
    "username": "hurrydb",
    "database": "postgres",
    "password": "hurrydatabase",
    "port": 5432,

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
