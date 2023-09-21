const mongoose = require('mongoose');

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
        required:[true, 'Please provide email'],
        unique:true
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