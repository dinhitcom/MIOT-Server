let roomTypesModel = require("../models/room_types.model");
let portsModel = require('../models/ports.model');
let devicesModel = require('../models/devices.model');
const { isValidObjectId } = require("mongoose");
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

module.exports.deleteDevice = (req, res) => {
    devicesModel.findOneAndDelete({'_id': req.params.did}, (err, device) => {
        if (err) {
            res.json({
                status: "error",
                message: err
            })
        } else {
            let espPort = device.deviceEspPort;
            portsModel.findOneAndUpdate({port: device.devicePort}, {$set: {isAvailable: true}}, (err, doc) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err
                    }) 
                } else {
                    res.json({
                        status: "success",
                        id: "remove_device_success",
                        message: "Xóa thiết bị thành công"
                    })
                }
            })
        }
    })
}
module.exports.getTemp = (req, res) => {
    let io = req.app.get('socketio');
    io.emit("getTemp", {
        message: "Temperature pls!"
    })
    res.json({
        status: "success",
        id: "get_temperature_success",
        message: "30"
    })
}
module.exports.getHumidity = (req, res) => {
    res.json({
        status: "success",
        id: "get_humidity_success",
        message: "60"
    })
}
module.exports.getAirQuality = (req, res) => {
    res.json({
        status: "success",
        id: "get_air_quality_success",
        message: "9.32"
    })
}
module.exports.turnDevice = (req, res) => {
    devicesModel.findByIdAndUpdate({'_id': req.params.did}, {$set: {status: req.body.status}}, (err, doc) => {
        if (err) {
            res.json({
                status: "error",
                message: err
            }) 
        } else {
            res.json({
                status: "success",
                id: "turn_device_success",
                message: "Bật/Tắt thiết bị thành công"
            })
        }
    });
}