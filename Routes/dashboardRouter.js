const express = require('express');
const { json } = require('express/lib/response');
const { read } = require('fs');
const path = require('path');
const Exam = require("../models/exam");
const User = require('../models/user');
const moment = require('moment');
const { findOne } = require('../models/exam');
const router = express.Router();

router.use((req,res,next)=>{
   if(req.isAuthenticated()) next();
   else {

     req.flash('unothorized',"You must Login first!");
     res.redirect('/login');
       
  }
})

function getoptionsList(options){
  let res = []
   
  for(op in options){
    res.push(options[op])
  }

  return res;
}

function getDateFromTime(duration){
  let time = duration.split(":")
  let ms =  (time[0] * 1000 * 60 * 60) + (time[1]* 100 * 60);

  return new Date(ms);
}

router.post('/exam',async(req,res)=>{
  

  
      let questionslist = []
    
      with(req.body.exam){
     for(let question in questions){
        
      questionslist.push({
         title: questions[question].text,
         img: questions[question].img,
         answer: questions[question].answer,
         options: getoptionsList(questions[question].options)
      });
     //  console.log(questions[question].options)
      }
    }
  
      
   try{
     let newExam =  new Exam({
        title: req.body.title,
        description: req.body.description,
        instructions:req.body.instructions,
        questions: questionslist,
        status: "",
         startTime: new Date(req.body.startdate),
         endTime : new Date(req.body.enddate),
         duration: getDateFromTime(req.body.duration),
         status:"pending"
      });

      await newExam.save();

      await User.findOne({'_id':req.user._id}).update({'$push':{"examHistory":newExam._id}});

      console.log(newExam);
      console.groupCollapsed(req.user);
   }catch(e){
      res.send(e.message);
   }



});

router.get('/createxam',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/pages/examcreation.html'));
});

router.get('/', async (req,res)=>{
  
  let exames = []
  let totalAttempts = 0;
  let activeExam = 0;
  let completedExam = 0;

    let exams = await User.findOne({'_id':req.user._id}).select('examHistory -_id');
    
     for(let exam of exams.examHistory){
         try{
      var temp = await Exam.findById(exam);
        totalAttempts += temp.responses;
        if(temp.status == "active") activeExam++;
        if(temp.status == "completed") completedExam++;
      exames.push(temp);
         }catch(e){console.log(e)}
     }

     let data = {user:req.user,
       exames:exames, 
       totalAttempts:totalAttempts, 
       activeExam:activeExam, 
       completedExam:activeExam , 
       moment:moment,
       async:true};
   // console.log(exames);
   // console.log(data);
    res.render('dashboard', {data});
  
});


router.get('/charts',(req,res)=>{
  res.render('charts')
})

router.get('/feedback',(req,res)=>{
  res.render('feedback');
});

router.get('/forms',(req,res)=>{
  res.render('forms');
});


// TODO - exam details page

router.get('/exams/:id',(req,res)=>{

  res.send(req.params.id);

});

module.exports = router