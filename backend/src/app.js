const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
  origin: "https://mern-stack-beige-psi.vercel.app/",
  credentials: true
}));
app.use(express.json({}))
app.use(express.urlencoded({extended:false}))

app.use('/api/v1',require('./routes'))

module.exports = app
