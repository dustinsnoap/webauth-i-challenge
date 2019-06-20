const crypt = require('bcryptjs')
const uuid = require('uuid')
const db = require('./model')

check_user = async (req, res, next) => {
    const {username, password} = req.body
    if(username && password) {
        req.body = {
            id: uuid.v4(),
            username: username,
            password: crypt.hashSync(password, 12)
        }
        next()
    } else
        res.status(400).json({message: `Need username and password. Try again.`})
}
authorize = async (req, res, next) => {
    const {username, password} = req.body
    req.body = {username: username, password: password}
    if(username && password) {
        const user = await db.get_user_by_username(username)
        if(crypt.compareSync(password, user.password)) {
            req.session.user = user
            next()
        } else {
            res.status(401).json({message: `Invalid credentials.`})
        }
    } else {
        res.status(400).json({message: `username or password not provided.`})
    }
}
restricted = async (req, res, next) => {
    req.session && req.session.user
    ?   next()
    :   res.status(401).json({message: `You're currently not logged in.`})
}

module.exports =
    {
        authorize,
        restricted,
        check_user,
    }