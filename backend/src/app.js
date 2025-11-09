const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors({
  origin: process.env.Frontend_URL,
  credentials: true
}));
app.use(express.json({}))
app.use(express.urlencoded({extended:false}))

app.use('/api/v1',require('./routes'))

module.exports = app
