module.exports = {
    type: 'postgres',
    url:
        'postgres://tbcwrcxxioxpva:49d6d2c87395a25218e22bd4bea7678fe26408b0cd91f9d35204410e26da4e6a@ec2-23-23-242-234.compute-1.amazonaws.com:5432/d5fgb7sl44hsau',
    // type: 'postgres',
    // host: 'hurrydb.cvx6sc53gqyv.us-east-2.rds.amazonaws.com',

    // username: 'hurrydb',
    // password: 'hurrydatabase',
    // port: 5432,
    // database: 'hurrydb',

    entities: [
        // eslint-disable-next-line no-path-concat
        // eslint-disable-next-line no-useless-concat

        './dist/models/*.js',
        // "./src/models/**/*.ts"
        // User,
        // Appointment,
        // Post,
        // MusicStyle,
        // Drink,
        // EventType
    ],
    migrations: [
        // './dist/database/**/migrations/*.js',
        './src/database/**/migrations/*.ts',
    ],
    cli: {
        migrationsDir: './src/database/migrations',
        entitiesDir: [
            // './dist/models',
            // eslint-disable-next-line no-useless-concat
            './dist/models/',
        ],
        // "entitiesDir": "./src/models"
    },
};
