const mongoose = require('mongoose')

const testDataSchema = mongoose.Schema({
    title:{
        type : String,
        required: true
    },
    formLink:{
        type:String,
        required: true
    },
   timeDuration:{
       type: Number
   },
   createdAt:{
       type: Date,
       default:  Date.now()
   }
})

module.exports = mongoose.model('testDataSchema' , testDataSchema)