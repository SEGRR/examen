const mongoose = require('mongoose');


const responses = mongoose.Schema({
    name: String,
    email: String,
    marks: {
       type: Number,
      default: 0},
    date: {
        type:Date,
       default: ()=> new Date()
     },
    status:{
        type:String,
        default:"failed"},
    answers: {
        type:[String],
        default:[]},
    ofexam: {
        type : mongoose.Types.ObjectId,
        required: true
    }
});



module.exports = mongoose.model('responses',responses)