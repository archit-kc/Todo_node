const mongoose = require("mongoose");
const env = require("../../.env");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(env.DB_CONNECTION_STRING);
        console.log("Database connected:", connect.connection.host);
    }catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;