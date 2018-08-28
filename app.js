const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose =require('mongoose');
const keys = require('./config/keys');
const CookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');
const app = express();

//set view engine
app.set('view engine','ejs');

app.use(CookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);


// connect to mongoose
mongoose.connect(keys.mongodb.dbURI,function(){
    console.log('connected to mongodb');
}); 

// create home route
app.get('/',function(req,res){
    res.render('home',{user:req.user});
});

app.listen(3000,function(){
    console.log('app now listening for request on port 3000');
});