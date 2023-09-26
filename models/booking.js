const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = mongoose.Schema({
    roomNumber:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    checkIn:{
        type: Date,
        required: true,
    },
    checkOut:{
        type: Date,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
          },
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    fullname:{ 
        type:String,
        required:true
        },
    price:{
        type:String,
        required:true
    },
    maxGuests:{
        type:Number,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

}
)


module.exports = mongoose.model('Booking', bookingSchema);