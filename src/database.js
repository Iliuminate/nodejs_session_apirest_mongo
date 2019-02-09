const mongoose = require('mongoose');
const pathL = require('path');
const { mongodb } = require (pathL.join(__dirname,'keys'));
//const { mongodb } = require ('.\keys');

mongoose.connect(mongodb.URI,{useNewUrlParser: true})
.then(db => console.log('Database is connected'))
.catch(err => console.error(err));