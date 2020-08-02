var express = require('express');
var controller = require('../controllers/rooms.controller');
var router = express.Router();

router.get('/list', controller.getRoomTypesList);
router.get('/ports', controller.getPortsList);
router.post('/:rid/devices/add', controller.addDevice);
router.put('/ports/update/:pid', controller.updatePort);
router.get('/:rid/devices', controller.getDevices);
module.exports = router;