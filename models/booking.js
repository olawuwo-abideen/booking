const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    roomNumber:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place',
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
        ref:"user"
    }

}
)


module.exports = mongoose.model('Booking', bookingSchema);