const express = require('express');
const path = require('path');
const router = express.Router();

router.use((req,res,next)=>{
   if(req.isAuthenticated()) next();
   else {
     req.flash('unothorized',"You must Login first!");
     res.redirect('/login');
       
  }
})

router.get('/',(req,res)=>{
    res.render('dashboard');
})

router.get('/charts',(req,res)=>{
  res.render('charts')
})

router.get('/feedback',(req,res)=>{
  res.render('feedback');
});

router.get('/forms',(req,res)=>{
  res.render('forms');
});

module.exports = router