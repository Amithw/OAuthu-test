const router = require('express').Router();

const authCheck = function(req,res,next){
if(!req.user){
    // if is not logged in
    res.redirect('/auth/login');
} else{
    // if loggin
    next();
    }
};
router.get('/',authCheck,function(req,res){ 
    res.render('profile',{user:req.user});

    // res.send('You are logged in, this is your profile-' + req.user.username);
});

module.exports = router;