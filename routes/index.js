const Router = require('express').Router();
const authRouter = require('./authRoutes');
const bookingRouter = require('./bookingRoutes');
const roomRouter = require('./roomRoutes');
const userRouter = require('./userRoutes');

Router.use(authRouter);
Router.use(userRouter);
Router.use(roomRouter);
Router.use(bookingRouter);

module.exports = Router;