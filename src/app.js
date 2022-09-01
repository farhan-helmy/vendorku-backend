const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const authRoute = require('./routes/auth')
const transactionTypeRoute = require('./routes/transactionType')
const employeeRoute = require('./routes/employee')
const payrollTypeRoute = require('./routes/payroll')
let RedisStore = require('connect-redis')(session)
require('./stratergies/local')

const { createClient } = require("redis")


let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)

const app = express()

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(cors())

app.use(morgan('short'))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/transactionType', transactionTypeRoute)
app.use('/api/v1/employee', employeeRoute)
app.use('/api/v1/payrollType', payrollTypeRoute)

module.exports = app