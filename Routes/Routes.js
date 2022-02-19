const express = require('express')
const path = require('path')
const router = express.Router()
const Test = require('./../models/testDataModel')

router.get('/', (req,res)=>{
    let allTest = Test.find();
    
    
})

router.get('/:id', (req,res)=>{
      
   let Exam =  Test.findById(req.params.id);

   req.render('TestTimer' , {ExamData : Exam});

})

router.post('/', async (req,res)=>{
     
    let timeduration =  req.body.hours * req.body.min * req.body.sec  * 1000

    let newTest = new Test({
        title: req.body.title,
        formLink : req.body.formLink,
        timeDuration: timeduration,     
        createdAt : new Date()
    })
    try{
     newTest = await newTest.save()
    // res.redirect(`/tests/${newTest.id}`)
      res.send(newTest)
    }catch(e){
       res.render('error',{error:e})
    }
})

module.exports = router