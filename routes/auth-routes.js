const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');

// auth login
router.get('/login',function(req,res){
    res.render('login',{user:req.user});
});
// auth logout
router.get('/logout',function(req,res){
    //  handle with passport
    req.logout();
    // req.session.destroy();
    res.redirect('/');
}); 

    //auth with google
router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}));
 
// call back route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),function(req,res){
    
    // res.send(req.user);
    res.redirect('/profile/');
});


module.exports = router;