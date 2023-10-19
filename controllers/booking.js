const Booking = require('../models/booking');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY



const ReserveARoom = async (req, res) => {
    const {token} = req.cookies;
    const {
        room, checkIn, checkOut, maxGuests,
        fullname, email, phone, price
    } = req.body;
    try {
        const userData = await jwt.verify(token,JWT_SECRET_KEY);
        const booking = await Booking.create({room, checkIn, checkOut, fullname, maxGuests, email, phone, price,user:userData.id});
        if (!booking) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "bad request" });
        }
        
        res.status(StatusCodes.CREATED).json(booking);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}



const retrievAllReservedRoom = async (req, res) =>{
    const {token}  = req.cookies;
    try{
        const userData = await jwt.verify(token,JWT_SECRET_KEY);
        const {id} = userData;
        const bookingData = await Booking.find({user:id}).populate('room');
        res.status(StatusCodes.OK).json(bookingData);
    }catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: 'failure', message: error.message});
    }
}
module.exports = {
    ReserveARoom,
    retrievAllReservedRoom
}