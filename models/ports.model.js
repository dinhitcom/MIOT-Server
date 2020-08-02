let mongoose = require('mongoose');
let portsSchema = new mongoose.Schema({
    port: {
        type: Number,
        required: true
    },
    espPort: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    }
})
module.exports = mongoose.model('ports', portsSchema, 'ports');