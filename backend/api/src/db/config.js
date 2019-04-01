module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            timezone: 'utc',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        debug: true
    },

    production: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};