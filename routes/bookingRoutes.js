const express = require('express');
const app = express();
app.use(express.json());
const bookingRouter = express.Router();

const { ReserveARoom,retrievAllReservedRoom,retrievAReservedRoom } = require('../controllers/booking');



bookingRouter.post('/bookings',ReserveARoom);
bookingRouter.get('/user-bookings',retrievAllReservedRoom);
bookingRouter.get('/user-booking',retrievAReservedRoom);







module.exports = bookingRouter;