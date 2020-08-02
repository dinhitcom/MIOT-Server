var express = require('express');
var controller = require('../controllers/users.controller');
var middleware = require('../middleware/users.middleware');
var router = express.Router();

router.post('/create', middleware.userCreate, controller.createUser);
router.post('/login', middleware.login, controller.login);
router.get('/list', controller.getUsers);
router.get('/:uid/rooms', middleware.getRooms, controller.getRooms);
router.post('/:uid/room', middleware.addRoom, controller.addRoom);
module.exports = router;