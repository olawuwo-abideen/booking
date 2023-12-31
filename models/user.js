const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    purpose:{
        type:String,
        required:true,
        enum: ['Business', 'Pleasure' ]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
          },
    },
    password: {
        type:String,
        required:[true, 'Please provide password'],
        minlength: 9,
        maxlength: 50,
       
    },
 
    
});

module.exports = mongoose.model('User', userSchema);