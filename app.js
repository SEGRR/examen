require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./Routes/Routes');
const dashboardRouter = require('./Routes/dashboardRouter');
const mongoose = require('mongoose');
const session = require('express-session') ;
const passport = require('passport');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');


const app = express();

//database connnectivity
 mongoose.connect(process.env.DB_URL);



// set static content of the project
app.use(express.static(path.join(__dirname,'public')));

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))


app.set('view engine' , 'ejs')  // set view engine

//session setup 
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,

  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    collection : "sessions"
  })
 }));






// authentication setup
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:false}))
const port = 3000

app.use('/dashboard',dashboardRouter);






app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/pages/index.html'));
  res.render('index')
})

app.get('/Login',(req,res)=>{
 // res.sendFile(path.join(__dirname,'public/pages/login.html'));
 res.render('login');

});

app.get('/Signup',(req,res)=>{
  // res.sendFile(path.join(__dirname,'public/pages/create-account.html'));
   res.render('create-account');
})

app.get('/create-account',(req,res)=>{
 // res.sendFile(path.join(__dirname,'public/pages/create-account.html'));
  res.render('create-account');

})

app.get('/forgot-password',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/pages/forgot-password.html'));

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// app.get("/Dashboard",(req,res)=>{
//   res.render('dashboard',{user : userProfile})
// })

passport.serializeUser((user, cb)=>{
  cb(null, user);
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});




var userProfile;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
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


  app.post('/Login',(req,res)=>{
    console.log(req.body);

  });


 let checkpassword = (req,res,next)=>{
      if(req.body.password == req.body.cpassword) next()
      else res.render('create-account',{error:"password didnt match"});
      
 }

  app.post('/create-account',checkpassword,(req,res)=>{
         console.log(req.body);
  })
  



