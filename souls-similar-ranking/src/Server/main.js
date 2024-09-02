require('dotenv').config()


const db = require('./database/client')
db.connect()