const express = require('express');
const app = express();
app.use(express.json());
const authRouter = express.Router();

const authContoller = require('../controllers/auth');
const verificationController = require('../controllers/verification');
const {signUpRules,loginRules} = require('../Request/authValidator');






authRouter
.post('/register',signUpRules,authContoller.register)
.post('/login',loginRules,authContoller.login)
.post('/logout',authContoller.logout)
.post('/request-password-reset-link',authContoller.requestPasswordResetLink)
.patch('/email-verification',verificationController.verifyUser)
.patch('/reset-password',authContoller.resetPassword)
.post('/email-verification-request',verificationController.sendVerificationRequest);

module.exports = authRouter;


