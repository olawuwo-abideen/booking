require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { validationResult } = require('express-validator');
const sendMail = require('./sendEmail/verificationMail');
const verificationModel = require('../models/userVerification');



const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    const errors = validationResult(req);
    const saltround = 10;
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST).json({ status: 'failure', message: errors.array() });
        return;
    }
    try {
        let hashedPassword = await bcrypt.hash(password, saltround)
        let OTP = Math.floor(Math.random() * new Date()).toString().slice(0, 4)
        const user = await User.create({ fullName: fullName, email: email, password: hashedPassword });
        await verificationModel.create({
            user: user._id,
            verificationToken: OTP
        })
        sendMail(email, `${BASE_URL}/verification/?id=${user._id}`, OTP);
        const signUpToken = await jwt.sign({ id: user._id, email: user.email }, jwt_secret)
        res.status(StatusCodes.CREATED).cookie('signUpToken', signUpToken).json({ status: 'success', message: "User created successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'failure', message: error.message });
    }

};



const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errors.array() });
        return;
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ status: 'failure', message: 'Email not registered' });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck) {
            const token = await jwt.sign({ email: user.email, id: user._id, name: user.name }, jwt_secret);
            res.status(StatusCodes.CREATED)
                .cookie("token", token, { maxAge: 1000 * (60 * 60 * 24), httpOnly: true })
                .json({ status: 'success', message: user });
        } else {
            res.status(StatusCodes.FORBIDDEN).json({ status: 'failure', message: "Incorrect credentials" });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'failure', message: error.message });
    }
};



const logout = (req, res) => {
    res.cookie("token", "").json({
        status: 'success',
        message: 'logout successfully'
    });
};

const requestPasswordResetLink = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: "failure", message: 'user not found' });
        }
        sendMail(email, `${BASE_URL}/reset-password/${user._id}`);
        res.status(StatusCodes.OK).json({ status: "success", message: 'password reset link was sent successfully' });
    } catch (error) {
        console.log({ error: error.message });
    }
};
const resetPassword = async (req, res) => {
    const { newPassword, id } = req.body;
    const salt = 10;
    try {
        const password = await bcrypt.hash(newPassword, salt);
        await User.updateOne({ _id: id }, { password: password })
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'password updated successfully'
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            message: error.message
        })
    }
};




module.exports = {
    register,
    login,
    logout,
    requestPasswordResetLink,
    resetPassword
  };


















module.exports = {
    register,
    login,
    logout,
    requestPasswordResetLink,
    resetPassword
  };
  