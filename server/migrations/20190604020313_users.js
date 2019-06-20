exports.up = knex =>
    knex.schema.createTable('users', tbl => {
        tbl.string('id')
            .notNullable()
            .unique()    
            .primary()
        tbl.string('username')
            .notNullable()
        tbl.string('password')
            .notNullable()
    })

exports.down = knex =>
    knex.schema.dropTableIfExists('users')
