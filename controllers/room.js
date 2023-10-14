const jwt = require('jsonwebtoken');
const Room = require('../models/room');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY 


const addNewRoom  = async (req, res) => {
    const {token} = req.cookies;
    const {
        roomNumber, suite, checkIn, 
        checkOut,maxGuests,price
    } = req.body;
    const userData = await jwt.verify(token,JWT_SECRET_KEY);
        
        const roomInfo = await Room.create({
            user: userData.id,
            roomNumber:roomNumber,
            suite: suite,
            checkIn: checkIn,
            checkOut: checkOut,
            maxGuests: maxGuests,
            price: price
        })
        res.status(201).json(roomInfo);
}

const retrieveUserRooms = async (req, res) => {
    const {token} = req.cookies;
    const userData = await jwt.verify(token,JWT_SECRET_KEY);
    const {id} = userData;
    const rooms = await Room.find({user:id});
    res.status(200).json(rooms);
}

const retrieveAUserRoom = async (req, res) => {
    const {id} = req.params;
    res.status(200).json(await Room.findById(id));
}
const showRoom = async (req, res) => {
    const {id} = req.params;
    res.status(200).json(await Room.findById(id));
}

const updateARoom = async (req, res) => {
    const {id} = req.params;
    const {token} = req.cookies;
    const {
        roomNumber, suite, checkIn, 
        checkOut,maxGuests,price
    } = req.body;
    const userData = await jwt.verify(token,JWT_SECRET_KEY);
    if(userData && userData.id){
        const room = await Room.findById(id);
        if(room && room.user.toString() === userData.id) {
            
           await Room.updateOne({_id: room._id},{
            user: userData.id,
            roomNumber:roomNumber,
            suite: suite,
            checkIn: checkIn,
            checkOut: checkOut,
            maxGuests: maxGuests,
            price: price
           })
            res.status(200).json(room);
        }else{
            res.status(404).json({message: ' 404 Not Found'});
        }
    }else{
        res.status(403).json({message: ' Access Denied'});
    }
}

const retrieveAllRooms = async(req, res) => {
    const rooms = await Room.find();
    res.status(200).json(rooms);
}

const searchRooms = async(req, res) => {
   try {
    const keys = ['suite', 'maxGuests', 'price']
    const {value} =req.params;
    const rooms = await Room.find();
    const result = rooms.filter((room) => room.title.includes(value));
    console.log(result);
    if (result.length === 0) {
       return  res.status(404).json({status:'failure',message:'not found'});
    }
   return res.status(200).json({status:'success',result});
   } catch (error) {
    res.status(500).json({ status:'failure', message: error.message});
   }


};


module.exports = { 
         addNewRoom,
         retrieveUserRooms,
         retrieveAUserRoom,
         showRoom,
         updateARoom, 
         retrieveAllRooms,
         searchRooms,
                };