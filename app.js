const express = require('express')
const path = require('path')
const router = require('./Routes/Routes')
const mongoose = require('mongoose')
const app = express()
mongoose.connect('mongodb://localhost/Exam')
app.use(express.urlencoded({extended:false}))
const port = 3000
app.use('/tests',router)
app.set('view engine' , 'ejs')  // set view engine
app.use(express.static('public'))

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public/pages/index.html'));
})

app.get('/Login',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/pages/login.html'));

})

app.get('/Signup',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/pages/create-account.html'));

})

app.get('/create-account',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/pages/create-account.html'));

})

app.get('/forgot-password',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/pages/forgot-password.html'));

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
