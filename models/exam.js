const mongoose = require('mongoose');


const responses = mongoose.Schema({
    name: String,
    email: String,
    marks: Number,
    answers: []
});

const exam = mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength: 20
    },
    description:{
        type:String,
        required:true,
    },
    instructions:{
        type:String,
        required:true,
        maxLength:100
    },
   questions:{
       type:[{
           title:{
               type: String,
               required: true
           },
           img:{
               type:String,
               requred:false,
               default:null
           },
           options:[String],
           answer: String,
           marks:{
               type:Number,
               default:1
           }
       }],
       default:[]
   },
   status: String,
   creationDate:{type: Date, default: ()=> Date.now()},
   startTime: Date,
   endTime : Date,
   duration:Date,
   maxAttempt:{
       type:Number,
       required:false,
       default:100
   },
   responses: {type:Number, default:0},
   OnTheSpotResult:{
       type:Boolean,
       default: false
   },
  
});

module.exports = mongoose.model('exam',exam);
