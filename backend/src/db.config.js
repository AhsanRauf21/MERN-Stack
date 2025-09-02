const { default: mongoose } = require("mongoose")

exports.ConnectDB = async () => {

try {
    
const db = await mongoose.connect(process.env.MONGO_URI)
console.log(`the db is connected wiht ${db.connection.host}`.bgGreen);



} catch (error) {
    
    await mongoose.disconnect()
    console.log('Error is db',error);
    
    process.exit(1)
    
}

}