const express = require('express');
const { rmSync } = require('fs');
const path = require('path');
const { route } = require('./Routes');
const router = express.Router()



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