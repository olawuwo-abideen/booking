const express = require('express');
const userController = require('../controllers/user');
const app = express();
const userRouter = express.Router();
app.use(express.json());

userRouter.get('/profile',userController.getUserProfile);
userRouter.patch('/profile',userController.updateUserProfile);
userRouter.patch('/password',userController.inAccountPasswordUpdate);
userRouter.delete('/profile',userController.deleteUserAccount);

module.exports = userRouter;