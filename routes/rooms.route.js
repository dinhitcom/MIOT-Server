var express = require('express');
var controller = require('../controllers/rooms.controller');
var router = express.Router();

router.get('/list', controller.getRoomTypesList);
router.get('/ports', controller.getPortsList);
router.post('/:rid/devices/add', controller.addDevice);
router.put('/ports/update/:pid', controller.updatePort);
router.get('/:rid/devices', controller.getDevices);
router.delete('/devices/:did/', controller.deleteDevice);
router.get('/:rid/devices/:did/turnOn', controller.turnOnDevice);
module.exports = router;