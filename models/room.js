const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomNumber :{
        type : Number,
        required : true
    },
    suite :{
        type : String,
        required : true
    },
    checkIn: {
        type : String,
        required : true
    },
    checkOut: {
        type : String,
        required : true
    },
    maxGuests :{
        type : Number,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.model('Room', roomSchema);