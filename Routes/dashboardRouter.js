const express = require('express');
const fs = require('fs');
const path = require('path');
const Exam = require("../models/exam");
const User = require('../models/user');
const Responses = require('../models/responses');
const moment = require('moment');
const csvwriter = require('csv-writer');
const exam = require('../models/exam');
const Feedback = require("../models/feedback");
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

router.post('/exames/exam',async(req,res)=>{
  
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

    let examStatus = req.body.status;

    if(examStatus == 'pending')  console.log('pending'); // TODO
    else if (examStatus == 'draft')  console.log('draft') // TODO - set message as status 
          

     req.body.duration.split(':')[0];
     

   try{
     let newExam =  new Exam({
        title: req.body.title,
        description: req.body.description,
        instructions:req.body.instructions,
        questions: questionslist,
        status: "",
         startTime: new Date(req.body.startdate),
         endTime : new Date(req.body.enddate),
         duration: {
            hh: req.body.duration.split(':')[0],
            mm : req.body.duration.split(':')[1],
            date : getDateFromTime(req.body.duration)
         },
         status:examStatus,
         creator: req.user.username
      });

      await newExam.save();

      await User.findOne({'_id':req.user._id}).update({'$push':{"examHistory":newExam._id}});

      console.log(newExam);
      console.groupCollapsed(req.user);
   }catch(e){
      res.send(e.message);
   }


   res.redirect('/dashboard');


});

router.get('/exames/createnew',(req,res)=>{
   res.render('examcreation');
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




router.get('/feedback', async (req,res)=>{

   let feedbacks = await Feedback.find();
   let user = req.user
  res.render('feedback',{feedbacks,user,moment});
});



router.get('/exames', async(req,res)=>{

  let exams = await User.findOne({'_id':req.user._id}).select('examHistory -_id');
   
  let exames = []
  for(let exam of exams.examHistory){
    try{
 var temp = await Exam.findById(exam);
    exames.push(temp);
    }catch(e){console.log(e)}
    
  }
    
    let data = {
      user:req.user,
      exames:exames, 
      moment:moment,
      async:true};

  res.render('exames', {data,completeEdit:req.flash('completeEdit'), deleteSuccess: req.flash("deleteSuccess")});
});


async function checkexam(req,res,next){

  try{

  let exam = await Exam.find({"_id": req.param.id});

  if(exam) next();
  else {
    req.flash("invalid code","Exam does not Exist");
    res.redirect('Dashboard/exames');
}

  }catch(e){
      req.flash("server error",e.message);
  }

  next()

}

router.get('/exames/:id',async (req,res)=>{

  try{

    let exam = await Exam.findOne({"_id": req.params.id});
    let  user = req.user

    console.log(exam);
    let responses = [];

     for( let id of exam.responsesData){
        let res = await Responses.findById(id);
        console.log(id);
         console.log(res);
        responses.push(res);
     }

    res.render('examdetails',{exam,user,moment,responses, completeEdit:req.flash('completeEdit')})
  
  }
  catch(e){
      console.log(e);
        req.flash("server error",e.message);
        res.redirect('/dashboard/exames');
    }
  

});


router.get('/exames/:id/downloadresponses', async(req,res)=>{
    
  let exam = await Exam.findOne({"_id": req.params.id});
    let respones = [];
    
   

    for(id of exam.responsesData){
      
      let res = await Responses.findById(id);

      if(res != null) respones.push(res);
    }

    
    let filename = 'res.csv';
    let filepath = path.join(__dirname,"../csv",filename);
     fs.open(filepath,(err, file)=>{
      var createCsvWriter = csvwriter.createObjectCsvWriter
  
      // Passing the column names intp the modul
      
      const csvWriter = createCsvWriter({
        path: filepath,
        header: [
        
          // Title of the columns (column_names)
          {id: 'name', title: 'Name'},
          {id: 'email', title: 'EMAIL'},
          {id: 'marks', title: 'MARKS OBTAINED'},
          {id:'status', title:'STATUS'},
          {id:'date', titel:'DATE'}
        ]
      });
        
      
      // Writerecords function to add records
      csvWriter
        .writeRecords(respones)
        .then(()=> res.sendFile(filepath) ) 
        .catch((e)=>{ 
          console.log(e.message);
          //req.flash("fileError","cannot download Respones file, Try again Later !"); res.redirect(`/Dashboard/exames/${req.params.id}`);
        });
     });
  
   
  
});


router.get('/exames/:id/delete', async(req,res)=>{
  
  try{
  let exam = await Exam.findOne({"_id": req.params.id});

  for(id of exam.responsesData){
    
    await Responses.findById(id).deleteOne();
  }

  await User.updateOne({'_id':req.user._id}, {'$pull':{'examHistory':exam._id}});

  await Exam.deleteOne({'_id':exam.id});
 
  req.flash('deleteSuccess',"Exam Deleted Successfully");
  res.redirect('/Dashboard/exames');

}catch(e){
   console.log(e);
}

});


router.get('/exames/:id/edit',async (req,res)=>{

  let exam = await Exam.findOne({"_id": req.params.id});
  let user = req.user;
  res.render('editexam',{user,exam,moment})

});


router.post('/exames/:id/edit',async (req,res)=>{

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

let examStatus = req.body.status;

if(examStatus == 'pending')  console.log('pending'); // TODO
else if (examStatus == 'draft')  console.log('draft') // TODO - set message as status 
      
try{
  await Exam.updateOne({'_id':req.params.id},{
    title: req.body.title,
    description: req.body.description,
    instructions:req.body.instructions,
    questions: questionslist,
    status: "",
     startTime: new Date(req.body.startdate),
     endTime : new Date(req.body.enddate),
    duration: {
      hh: req.body.duration.split(':')[0],
      mm : req.body.duration.split(':')[1],
      date : getDateFromTime(req.body.duration)
   },
     status:examStatus
  });

}catch(e){
  res.send(e.message);
}

req.flash("completeEdit", `Exam edited successfully`);
res.redirect(`/dashboard/exames/${req.params.id}`);

});





module.exports = router