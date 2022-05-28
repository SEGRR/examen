const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');



const exam = mongoose.Schema({
    title:{
        type:String,
        required:true,
    
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
   duration:{
       hh: String,
       mm: String,
       date: Date
   },
   maxAttempt:{
       type:Number,
       required:false,
       default:100
   },
   responses: {type:Number, default:0},

   responsesData :
            {
                type: [mongoose.Types.ObjectId],
                default : []
    },

   OnTheSpotResult:{
       type:Boolean,
       default: false
   },
  
   creator: String
});

module.exports = mongoose.model('exam',exam);
