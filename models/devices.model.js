let mongoose = require('mongoose');
let devicesSchema = new mongoose.Schema({
    deviceName: {
        type: String,
        required: true
    },
    devicePort: {
        type: String,
        required: true
    },
    deviceEspPort: {
        type: String,
        required: true
    },
    deviceRoom: {
        type: mongoose.Schema.Types.ObjectID,
        required: true
    },
    status: {
        type: Boolean
    }
})
module.exports = mongoose.model('devices', devicesSchema, 'devices');