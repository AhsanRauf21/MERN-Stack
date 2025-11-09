require("dotenv").config({
    path:'.env'
})
require('colors')
const app = require("./src/app");

const { ConnectDB } = require("./src/db.config");
const port  = process.env.PORT || 4500
ConnectDB()
app.get('/',(req,res) => {
    res.send(`<h1>Server Running<h1/>`)
})

app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`.bgBlue);
    
})
