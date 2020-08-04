let mongoose = require('mongoose');
let portsSchema = new mongoose.Schema({
    port: {
        type: String,
        required: true
    },
    espPort: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    }
})
module.exports = mongoose.model('ports', portsSchema, 'ports');