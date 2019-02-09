const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pathL = require('path');

const dirLocal = pathL.join(__dirname,'..','models','user')
const User = require(dirLocal);

//- Serializar para usar session
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


//- Definicion para signup

passport.use('local-singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 

}, async (req, email, password, done) => {
    
    console.log('Email: '+email);
    //Validamo que no exista el usuario
    const suser = await User.findOne({ email: email });
    
    if(suser){
        return done(null, false, req.flash('signupMessage','The email is already taken'));
    } else{
        //Encriptamos y guardamos el newvo usuario
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPass(password);
        const obj = await newUser.save()
        done(null, newUser)
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 

}, async (req, email, password, done) => {
    
    console.log('Email-Signin: '+email);
    const user =  await User.findOne({ email: email });
    if (!user){
        return done(null, false, req.flash('signinMessage','No user found'));
    }
    if (!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage', 'Incorrect password'));
    }
    //console.log('User-Signin: '+user);
    done(null, user);
}));