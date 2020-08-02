let mongoose = require('mongoose');
// let deviceSchema = new mongoose.Schema({
//     device_name: {
//         type: String,
//     },
//     device_port: {
//         type: String,
//     }         
// })
// let roomSchema = new mongoose.Schema({
//     room_type_id:{
//         type: mongoose.Schema.Types.ObjectID,
//     },
//     room_name: {
//         type: String,
//     },
//     description: {
//         type: String
//     },
//     icon: {
//         type: String,
//     }, 
//     device: [deviceSchema]
// })
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
       
});

module.exports = mongoose.model('users', UserSchema, 'users');