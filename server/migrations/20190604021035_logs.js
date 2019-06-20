exports.up = knex =>
    knex.schema.createTable('logs', tbl => {
        tbl.increments()
        tbl.string('user_id')
            .notNullable()
            .references('id')
            .inTable('projects')
        tbl.timestamps(true)
    })

exports.down = knex =>
    knex.schema.dropTableIfExists('logs')