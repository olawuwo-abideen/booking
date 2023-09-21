const express = require('express');
const userController = require('../controllers/user');
const app = express();
const userRouter = express.Router();
app.use(express.json());

userRouter.get('/profile',userController.getProfile);
userRouter.patch('/profile',userController.updateProfile);
userRouter.patch('/password',userController.inAccountPasswordUpdate);
userRouter.delete('/profile',userController.deleteAccount);

module.exports = userRouter;