const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',(req, res, next) => {
    res.render('index');
});


router.get('/singup',(req, res, next) => {
    res.render('singup');
});

router.post('/singup', passport.authenticate('local-singup',{
    successRedirect: '/profile',
    failureRedirect: '/singup',
    passReqToCallback: true
}));

/*
router.post('/singup',(req, res, next) => {
    console.log(req.body);
    res.send('REceived')
});
*/

router.get('/signin',(req, res, next) => {
    res.render('signin')
});


router.post('/signin',passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout',(req, res, next) => {
    req.logout();
    res.redirect('/')
});


router.get('/dashboard', isAuthenticated,(req, res, next) => {
    res.render('dashboard');
});

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});


router.get('/profile', (req, res, next) => {
    res.render('profile');
});

//- Valida si esta autenticado
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
};

module.exports = router