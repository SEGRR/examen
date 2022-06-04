const express = require('express')
const router = express.Router()
const Exam = require('../models/exam');
const Response = require('../models/responses');
const moment = require('moment');
const Feedback = require("../models/feedback");


router.get('/', (req,res)=>{

    let invalidCode = req.flash('invalidCode');
   res.render('examcode',{invalidCode});

});



router.post('/', (req,res)=>{

    res.redirect(`/exam/${req.body.code}`);

});


router.post('/:id/startexam', async (req,res)=>{
      
    try{
    let exam = await Exam.findById(req.params.id);
      if(exam == null ){
          req.flash('invalidCode', "Enter Exam does not Exist");
          res.redirect('/error');
      }else{
        let response = await Response.find({'email':req.body.email , 'ofexam':exam._id});

        if(response.length > 0){
            console.log(response);
            req.flash("duplicateResponse","Only one response is allowed per email");
            res.redirect(`/exam/${req.params.id}`);
        }else{
           
          let response = {name: req.body.name , email: req.body.email, ofexam:exam._id};
          
         // req.flash('resobjeid',response._id);
            res.render('exam',{exam,response});
        }

      }
    }catch(e){
        console.log(e);
    }
});



function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days"
  }
 


router.get('/:id', async(req,res)=>{
       
    try{
        let exam = await Exam.findById(req.params.id);
            
          if(exam == null ){
              req.flash('invalidCode', "Enter Exam does not Exist");
              res.redirect('/exam');
          }
          
         else if(moment().isBefore(exam.startTime)){
              res.render(`examyettostart`,{exam,moment});
          }

           else if(moment().isAfter(exam.endTime)){
              res.render('timeover',{exam,moment});
          }
          else
          res.render('examFront',{exam, moment});
    
    
        }catch(e){
            console.log(e);
        }



});



router.post('/:id/evaluation', async (req,res)=>{

    try{
    let exam = await Exam.findById(req.params.id);
    
    var i =0 ;
    var marks = 0;
    var answersl = [];
    console.log(req.body);
     for(let q in req.body.exam){

        var ans  = req.body.exam[q].answer;
        if(ans == exam.questions[i].answer){
          marks++;
          console.log("answers - ",ans);
        }

        answersl.push(ans);
        i++;
     }

     console.log(answersl);
      let status = "passed"
     if(marks < 1 ) status = "Failed";
     
     let response = new Response({
         name:req.body.name,
         email:req.body.email,
         marks:marks,
         status: status,
         ofexam:exam._id
     });

    responsesaved =  await response.save();

     await Exam.updateOne({'_id':exam._id},{'$push':{'responsesData':responsesaved._id},responses:(exam.responses + 1)});
     
      let data = {
          examid : exam._id,
          responseid: response._id
      }
      
     res.render('examsuccess',{data});
    }catch(e){
        console.log(e.message);
    }
});


router.post('/feedback', async (req,res)=>{

 if(req.body.feedback != ''){
 try{
   let res = Response.findById(req.body.responseid);
    let exam = Response.findById(req.body.examid).select('title');  
   let feedback = new Feedback({
       name: res.name,
       email: res.email,
       text: req.body.feedback,
       ofExam: exam._id,
       examName: exam.title
   });

  feedback = await feedback.save();

  await Exam.updateOne({"_id":exam._id},{"$push":{"feedbacks":feedback._id}});

 }catch(e){ console.log(e);}
 }

  res.redirect('/')

});

module.exports = router