const express = require('express');
const app = express();
app.use(express.json());
const bookingRouter = express.Router();

const { ReserveARoom,retrievAllReservedRoom } = require('../controllers/booking');



bookingRouter.post('/bookings',ReserveARoom);
bookingRouter.get('/user-bookings',retrievAllReservedRoom);








module.exports = bookingRouter;