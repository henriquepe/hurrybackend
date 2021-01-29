let url = '';
let entities = [];
let migrations = [];
let migrationsDir = '';
let entitiesDir = '';

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
    url = process.env.DB_DEVELOPMENT;
    entities = process.env.ENTITIES_DEVELOPMENT;
    migrations = process.env.MIGRATIONS_DEVELOPMENT;
    migrationsDir = process.env.MIGRATIONS_DIR_DEVELOPMENT;
    entitiesDir = process.env.ENTITIES_DIR_DEVELOPMENT;
} else {
    url = process.env.DB_PRODUCTION;
    entities = process.env.ENTITIES_PRODUCTION;
    migrations = process.env.MIGRATIONS_PRODUCTION;
    migrationsDir = process.env.MIGRATIONS_DIR_PRODUCTION;
    entitiesDir = process.env.ENTITIES_DIR_PRODUCTION;
}

module.exports = {
    type: 'postgres',
    // url:
    //     'postgres://tbcwrcxxioxpva:49d6d2c87395a25218e22bd4bea7678fe26408b0cd91f9d35204410e26da4e6a@ec2-23-23-242-234.compute-1.amazonaws.com:5432/d5fgb7sl44hsau',

    url,

    entities: [
        // eslint-disable-next-line no-path-concat
        // eslint-disable-next-line no-useless-concat

        entities,
        // "./src/models/**/*.ts"
        // User,
        // Appointment,
        // Post,
        // MusicStyle,
        // Drink,
        // EventType
    ],
    migrations: [
        migrations,
        // './src/database/**/migrations/*.ts',
    ],
    cli: {
        migrationsDir,
        entitiesDir: [
            // './dist/models',
            // eslint-disable-next-line no-useless-concat
            entitiesDir,
        ],
        // "entitiesDir": "./src/models"
    },
};
