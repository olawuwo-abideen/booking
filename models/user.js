const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
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
    profileImage:{
        type:String,
        required:true
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
    timestamps:true
    
});

module.exports = mongoose.model('User', userSchema);