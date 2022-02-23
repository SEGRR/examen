const express = require('express')
const path = require('path')
const router = require('./Routes/Routes')
const mongoose = require('mongoose')
const session = require('express-session') 
const passport = require('passport')


const app = express()
app.use(session({ resave: false,
  saveUninitialized: true,
  secret: 'SECRET' }));



app.use(passport.initialize());
app.use(passport.session());


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

app.get("/Dashboard",(req,res)=>{
  res.render('dashboard',{user : userProfile})
})

passport.serializeUser((user, cb)=>{
  cb(null, user);
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});




var userProfile;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '140130054934-ql3c72ijf63ngi95g1ih15nml4codlq1.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/Dashboard');
  });