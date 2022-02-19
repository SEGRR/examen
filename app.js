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

app.get('/', (req, res) => {
  res.render('index' , {msg : "hello world"})
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
