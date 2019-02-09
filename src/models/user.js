const mongoose = require('mongoose');
const bcryp = require('bcrypt-nodejs');
const { Schema } = mongoose;

//Define el esquema de los datos
const userSchema = new Schema ({
    email:String, 
    password:String
});

userSchema.methods.encryptPass = (password) => {
    return bcryp.hashSync(password, bcryp.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcryp.compareSync(password, this.password);
};

//Almacena los datos en una collection
module.exports = mongoose.model('users',userSchema);