const knex = require("knex");
require("dotenv").config();

const {PGCONNECTIONURI} = process.env;

module.exports ={
    db: knex({
        client:'pg',
        connection: {
            connectionString: PGCONNECTIONURI
        },
        ssl: {rejectUnauthorized: false }
    })
}