//IMPORTS
const server = require('./config/server')

//PORT
const port = 3333

//867-5309
server.listen(port, () =>
    console.log(`\n*** Get off my lawn on port ${port} ***\n`))