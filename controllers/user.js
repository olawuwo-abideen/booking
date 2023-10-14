const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const getUserProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const verify = await jwt.verify(token, JWT_SECRET_KEY);
            const user = await User.findById(verify.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(422).json({ message: "Invalid token" });
    }
}


const updateUserProfile = async (req, res) => {
    const { token } = req.cookies;
    try {
        const {
            fullName, phoneNumber, purpose} = req.body;

        const verify = await jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(verify.id);
        if (!user) {
            res.status(404).json({
                status: 'failure',
                message: 'user not found'
            })
        }
        await User.updateOne({ _id: verify.id }, {
            fullName,
            phoneNumber,
            purpose,
            
        });
        res.status(201).json({
            status: 'success',
            message: 'profile updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            status: 'failure',
            message: error.message
        })
    }
};


const userAccountPasswordUpdate = async (req, res) => {
    const { token } = req.cookies;
    const saltRound = 10;
    try {
        const { currentPassword, newPassword, } = req.body;
        const verifyUser = jwt.verify(token, JWT_SECRET_KEY);

        if (!verifyUser) {
            return res.status(401).json({
                status: 'failure',
                message: 'you are not authorized to perform this action'
            });
        }
        const storedUser = await User.findById(verifyUser.id);
        if (!storedUser) {
            return res.status(404).json({
                status: 'failure',
                message: 'user not found'
            });
        }

        const comparePassword = await bcrypt.compare(currentPassword, storedUser.password);
        if (!comparePassword) {
            return res.status(404).json({
                status: 'failure',
                message: 'current password mismatch'
            });
        }
        const password = await bcrypt.hash(newPassword, saltRound);
        await User.updateOne({ _id: storedUser._id }, { password: password });
        res.status(201).json({
            status: 'success',
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            message: error.message
        })
    }
};


const deleteUserAccount = async (req, res) => {
    const { token } = req.cookies;
    const verify = await jwt.verify(token, JWT_SECRET_KEY);
    if (!verify) {
        return res.status(401).json({ status: 'failure', message: "unauthorized action" });
    };
    const user = await User.findById(verify.id);
    if (!user) {
        return res.status(404).json({ status: 'failure', message: "user not found" });
    }
    await User.deleteOne({ _id: verify.id });
    res.status(204).json({ status: 'success', message: "account deleted successfully" });
};


module.exports = {
    getUserProfile,
    updateUserProfile,
    userAccountPasswordUpdate,
    deleteUserAccount
    
}