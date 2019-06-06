//IMPORTS
const express = require('express')
const router = express.Router()
const db = require('./model')
const {auth, check_user} = require('./middleware')

//Route: /api/

//C
//creates a new user
//required fields:
//optional fields:
router.post('/register', check_user, async (req, res) => {
    try {
        const user = await db.add_user(req.body)

        user
        ?   res.status(201).json(user)
        :   res.status(404).json({message: `User couldn't be added.`})
    }
    catch (err) {
        res.status(500).json(err)
    }
})
router.post('/login', authorize, async (req, res) => {
    try {
        console.log('made it here')
        const user = await db.get_user_by_username(req.body.username)
        await db.add_session(user.id)
        user
        ?   res.status(201).json(user)
        :   res.status(404).json({message: `Wrong`})
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})
//R
router.get('/users', restricted, async (req, res) => {
    try {
        const users = await db.get_users()
        users.length > 0
        ?   res.status(200).json(users)
        :   res.status(404).json({messgae: `Couldn't find users.`})
    }
    catch (err) {
        res.status(500).json(err)
    }
})
router.get('/sessions', async (req, res) => {
    try {
        const sessions = await db.get_sessions()
        sessionStorage.length > 0
        ?   res.status(200).json(sessions)
        :   res.status(404).json({messgae: `Couldn't find sessions.`}) 
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//U
//D
router.get('/logout', async (req, res) => {
    req.session
    ?   req.session.destroy(err => {
            err
            ?   res.status(500).json({message: `Can't log you out, surry.`})
            :   res.status(200).json({message: `You were logged out. Cool.`})
        })
    :   res.status(200).json({message: `Try logging in first next time.`})
})

module.exports = router