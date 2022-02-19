
const mongoose = require("mongoose");


const examinerModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    emailId:{
        type : String,
        required : true,
        unique : true,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 15
    },

    examHistory: {
        type: [mongoose.Types.ObjectId],
        default : [],

    }
});

module.exports = mongoose.model("Examiner",examinerModel);


