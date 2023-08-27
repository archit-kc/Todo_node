const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
        name : {
            type: String,
            required: [true, "Please add the todo name"]
        },
        description : {
            type: String,
            required: [true, "Please add the todo description"]
        },
        completedBy : {
            type: Date,
            required: [true, "Please add the todo completed By Date"]
        },
        important : {
            type: Boolean,
            default: false
        },
        isCompleted : {
            type: Boolean,
            default: false
        },
        completedDate : {
            type: Date,
        },
    },
    {
        timeStamps : true
    }
);

module.exports = mongoose.model("todoModel", todoSchema);