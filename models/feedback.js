const mongoose = require('mongoose');

const feedback =   mongoose.Schema({
    name: String,
    email: String,
    givenAt:{
        type: Date,
        default: ()=> new Date()
    },
    text:{
        type:String,
    },
    ofExam: mongoose.Types.ObjectId,
    examName: String
});


module.exports = mongoose.model('feedback',feedback);