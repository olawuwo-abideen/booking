const {check} = require('express-validator');
const userModel = require('../models/user');

const signUpRules = [
    check('fullname',"provide your full name").notEmpty().escape(),
    check('email', "please provide a valid email").notEmpty().escape().trim().isEmail(),
    check('email').custom(async email => {
        const user = await userModel.findOne({ email: email});
        if (user) {
            throw new Error('Email already in use');
        }
        return false;
    }),
    check('password',"please provide an alphanumeric password with more than 6 characters").notEmpty().escape().trim().isLength({min: 8}).isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
    }).withMessage('please provide a strong password'),
    check('confirm_password', "please confirm your password").escape().custom(async (confirmPassword, {req}) => {
        return confirmPassword === req.body.password;
    })
]
const loginRules = [
    check('email', 'please enter your email').notEmpty().trim().escape().isEmail(),
    check('password', 'please enter your password').notEmpty().trim().escape(),
    check('email').custom(async email => {
        if( !await userModel.findOne({ email: email})){
            throw new Error('Email not registered');
        }
    })
]
module.exports = {signUpRules,loginRules};