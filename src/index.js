const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


//-------------------------------------
//--- Inizializations ---
//-------------------------------------
const app = express();
require(path.join(__dirname,'database'));
require(path.join(__dirname,'passport','local-auth'));

//-------------------------------------
//--- Setting ---
//-------------------------------------
// Define views routes
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//-------------------------------------
//--- Middlewares ---
//-------------------------------------
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false})); //Le decimos al servidor que vamos a recibir datos simples desde el cliente
//- Este se debe ajustar para recibir en formato json por ejemplo
app.use(express.json()); //Nos permite usar el formato json en nuestro servidor 
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});


//-------------------------------------
//--- Routes ---
//-------------------------------------
app.use('/', require(path.join(__dirname, 'routes','index')));

//-------------------------------------
//--- Starting the server ---
//-------------------------------------
app.listen(app.get('port'),() => {
    console.log('Server on port,', app.get('port'))
});