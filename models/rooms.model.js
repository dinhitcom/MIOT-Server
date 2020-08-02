let mongoose = require('mongoose');
let roomSchema = new mongoose.Schema({
    roomTypeId:{
        type: mongoose.Schema.Types.ObjectID,
    },
    roomName: {
        type: String,
    },
    roomDesc: {
        type: String
    },
    roomIcon: {
        type: String,
    },
    roomOwner: {
        type: mongoose.Schema.Types.ObjectID
    }
})
module.exports = mongoose.model('rooms', roomSchema, 'rooms');