const express = require('express');
const app = express();
app.use(express.json());
const authRouter = express.Router();

const authController = require('../controllers/auth');
const verificationController = require('../controllers/verification');
const {signUpRules,loginRules} = require('../requestValidator/authValidator');








authRouter
.post('/register',signUpRules,authController.register)
.post('/login',loginRules,authController.login)
.post('/logout',authController.logout)
.post('/request-password-reset-link',authController.requestPasswordResetLink)
.patch('/email-verification',verificationController.verifyUser)
.patch('/reset-password',authController.resetPassword)
.post('/email-verification-request',verificationController.sendVerificationRequest);

module.exports = authRouter;


