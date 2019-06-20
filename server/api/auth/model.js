//IMPORTS
const knex = require('knex')
const config = require('../../knexfile')
const db = knex(config.development)
const uuid = require('uuid')

//C
const add_user = async user =>
    await db('users').insert(user)
const add_session = async id => {
    await db('logs').insert({user_id: id})
}
//R
const get_sessions = async () =>
    await db('logs')
const get_users = async () =>
    await db('users')
const get_user_by_username = async username =>
    await db('users').first().where({username})
//U
//D
const logout_user = async user_id =>
    await db('logs').first().where('user_id', user_id).del()

module.exports = {
    add_user,
    add_session,
    get_users,
    get_user_by_username,
    get_sessions,
    logout_user,
}