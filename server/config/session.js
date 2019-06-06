const session = require('express-session')

const config = {
    name: 'sesh', //defaults to 'sid' if not provided
    secret: 'wait for it...',
    cookie: {
        maxAge: 1000 * 30,  //in miliseconds, optional
        secure: false,      //true will only send cookies over https
        httpOnly: true,     //cannot be accessed from javascript
    },
    resave: false,          //recreat a session on change?
    saveUninitialized: true,  //should only be true is a use opts in for cookies, or dev purposes
}

module.exports = session(config)
