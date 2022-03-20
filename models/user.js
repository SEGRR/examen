
const mongoose = require("mongoose");


const User = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email:{
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

module.exports = mongoose.model("User",User);


