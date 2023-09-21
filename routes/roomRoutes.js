const roomRouter = require('express').Router();
const roomController = require('../controllers/room');



roomRouter.post('/room',     roomController.addNewPlace);


roomRouter.get('/rooms',      roomController.retrieveUserRooms);
roomRouter.get('/rooms/:id',  roomController.retrieveAUserRoom);
roomRouter.put('/rooms/:id',  roomController.updateARoom);
roomRouter.get('/allrooms',   roomController.retrieveAllRooms);
roomRouter.get('/rooms/:id',  roomController.showRoom);
roomRouter.get('/searchrooms/:value',roomController.searchRooms);



module.exports = roomRouter;