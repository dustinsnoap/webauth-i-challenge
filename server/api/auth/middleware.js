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
auth = async (req, res, next) => {
    const {username, password} = req.body
    req.body = {username: username, password: password}
    
    if(username && password) {
        const user = await db.get_user_by_username(username)
        crypt.compareSync(password, user.password)
        ?   next()
        :   res.status(401).json({message: `Invalid credentials.`})
    }
}

module.exports =
    {
        auth,
        check_user,
    }