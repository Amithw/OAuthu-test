const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser(function(user,done){ 
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        done(null,user);  
    });
    
});

passport.use(
    new GoogleStrategy({
        //options for the google start
        callbackURL:'/auth/google/redirect',
        clientID : keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },function(accessToken,refreshToken,profile,done){

        // check if user already exists in our db
        User.findOne({googleId:profile.id}).then(function(currentUser){
            if(currentUser){
                // already have the user
                console.log('user is:'.currentUser);
                done(null,currentUser);
            }else{
                //if not, create user in our db
                new User ({
                    username:profile.displayName,
                    googleId:profile.id,
                    thumbnail:profile._json.image.url
                }).save().then(function(newUser){
                    console.log('new user created:'+newUser); 
                    done(null,newUser);
                });                
            }
   
        });


    })  
)
 