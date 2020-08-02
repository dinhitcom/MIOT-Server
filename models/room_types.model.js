let mongoose = require('mongoose');

let room_typeSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    roomIcon: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('room_types', room_typeSchema, 'room_types');