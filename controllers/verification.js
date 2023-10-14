const userModel = require('../models/user');
const verificationModel = require('../models/userVerification');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const sendEmail = require('./sendEmail/verificationMail');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const sendVerificationRequest = async (req, res) => {
   try {
    const {signUpToken} = req.cookies;
    const userData = await jwt.verify(signUpToken, JWT_SECRET_KEY);
    const OTP = Math.floor(Math.random() * new Date()).toString().slice(0,4);
    await verificationModel.create({
        user: userData.id,
        verificationToken:OTP
    });
    sendEmail(userData.email,`${BASE_URL}/verification/?id=${userData.id}`,OTP);
    res.status(200).json({
        status:'success',
        message: 'Verification code sent'
    });

   } catch (error) {
    res.status(500).json({
        status:'failure',
        message: error.message});
   }

};
const verifyUser = async (req, res) => {
    const {signUpToken} = req.cookies;
    const userData = await jwt.verify(signUpToken, JWT_SECRET_KEY); 
    const {token} = req.body;
    try {
       const user = await verificationModel.findOne({user: userData.id});
        if(token !== user.verificationToken){
            res.status(400).json({
                status: 'failure',
                message:'invalid verification Token'
            });
            return;
        } else if((Date.now().valueOf() - new Date(user.createdAt).valueOf())/(1000*60*60) > 1){
            res.status(400).json({
                status:'failure',
                message:'Expired verification Token'
            })
        }
        await userModel.updateOne({_id:userData.id},{isVerified:true});
        await verificationModel.deleteMany({user:userData.id});
        res.status(201).json({
            status:'success',
            message:'Verification successful'
        })
    } catch (error) {
       res.status(500).json({
        status:"failure",
        message: error.message}); 
    }
}

module.exports = {
    verifyUser,
    sendVerificationRequest 
}