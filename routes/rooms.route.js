var express = require('express');
var controller = require('../controllers/rooms.controller');
var router = express.Router();

router.get('/list', controller.getRoomTypesList);
router.get('/ports', controller.getPortsList);
router.post('/:rid/devices/add', controller.addDevice);
router.put('/ports/update/:pid', controller.updatePort);
router.get('/:rid/devices', controller.getDevices);
router.delete('/devices/:did/', controller.deleteDevice);
router.put('/devices/:did/turn', controller.turnDevice);
router.get('/temperature', controller.getTemp);
router.get('/humidity', controller.getHumidity);
router.get('/airquality', controller.getAirQuality);
module.exports = router;