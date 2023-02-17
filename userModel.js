var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        //validacion solo puede haber un unico correo
        unique:true

    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }

});

// Collection "users"
module.exports = mongoose.model('users', userSchema);