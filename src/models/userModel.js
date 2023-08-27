const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        userName : {
            type: String,
            required: [true, "Please add the user name"]
        },
        email : {
            type: String,
            required: [true, "Please add the email"]
        },
        password : {
            type: String,
            required: [true, "Please add the password"]
        },
    },
    {
        timeStamps : true
    }
);

module.exports = mongoose.model("users", userSchema);