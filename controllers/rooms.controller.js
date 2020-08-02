let roomTypesModel = require("../models/room_types.model");
let portsModel = require('../models/ports.model');
let devicesModel = require('../models/devices.model');
module.exports.getRoomTypesList = (req, res) => {
    roomTypesModel.find({}, (err, room_types) => {
        res.json(room_types);
    })
}
module.exports.getPortsList = (req, res) => {
    portsModel.find({}, (err, ports) => {
        res.json(ports);
    })
}
module.exports.addDevice = (req, res) => {
    let device = new devicesModel;
    device.deviceName = req.body.deviceName;
    device.devicePort = req.body.devicePort;
    device.deviceEspPort = req.body.deviceEspPort;
    device.deviceRoom = req.params.rid;
    device.status = "false";
    device.save((err)=>{
        if (err) {
            res.json({
            status: "error",
            id: err,
            message: "Thêm thiết bị thất bại"
            }); 
        } else {
            res.json({
                status: "success",
                id: "add_device_success",
                message: "Thêm thiết bị thành công"
            });
        }
    })
}
module.exports.updatePort = (req, res) => {
    portsModel.findOneAndUpdate({'_id': req.params.pid}, {$set: {'isAvailable': "false"}}, (err, doc) => {
        if (doc) res.json({
            status: "success",
                id: "update_port_success",
                message: "Cập nhật cổng thành công"
        })
    });
}
module.exports.getDevices = (req, res) => {
    devicesModel.find({'deviceRoom': req.params.rid}, (err, devices) => {
        if (err) {
            res.json({
                status: "error",
                message: err
            })
        } else {
            res.json(devices);
        }
    })
}
module.exports.turnOnDevice = (req, res) => {
    
}