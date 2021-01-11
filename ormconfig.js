/* eslint-disable prettier/prettier */

import User from './src/models/User.entity';
import Appointment from './src/models/Appointment.entity';
import Post from './src/models/Post.entity';
import MusicStyle from './src/models/MusicStyle.entity';
import Drink from './src/models/Drink.entity';
import EventType from './src/models/EventType.entity';


module.exports = {
    "type": "postgres",
    "url": "postgres://hurrydb:hurrydatabase@hurrydb.cvx6sc53gqyv.us-east-2.rds.amazonaws.com:5432/postgres",
    // "type": "postgres",
    // "host": "hurrydb.cvx6sc53gqyv.us-east-2.rds.amazonaws.com",
    // "username": "hurrydb",
    // "password": "hurrydatabase",
    // "port": 5432,

    "entities": [
        // "dist/models/*.js",
        // "./src/models/**/*.ts"
        User,
        Appointment,
        Post,
        MusicStyle,
        Drink,
        EventType
    ],
    "migrations": [
        "dist/database/**/migrations/*.js",
        // "./src/database/**/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": ["./dist/models", "./src/models"],
        // "entitiesDir": "./src/models"
    }
}
