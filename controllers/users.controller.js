let bcrypt = require("bcryptjs");
let saltRounds = 10;

let usersModel = require("../models/users.model");
let roomsModel = require("../models/rooms.model");
module.exports.createUser = (req, res) => {
    let user = new usersModel();
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, saltRounds);
    user.name = req.body.name;
    user.rooms = [{}]
    user.save(function(err) {
        if (err) {
            res.json({
            status: "error",
            id: "user_create_error",
            message: err
        });
        } else
        res.json({
            status: "success",
            id: "user_created",
            message: "Đăng ký thành công"
        });
      });
}

module.exports.login = (req, res) => {
    res.json({
        status: "success",
        id: "login_success",
        message: "Đăng nhập thành công",
        name: req.name,
        uid: req.uid
    });
}

module.exports.getUsers = (req, res) => {
    let query = usersModel.find({}).select({'password':0});
    query.exec((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err
            })
        } else {
            let usersList = {};
            users.forEach((user)=>{
                usersList[user._id] = user;
            });
            res.json(usersList);
        }
    });
}
module.exports.addRoom = (req, res) => {
    let room = new roomsModel;
    room.roomTypeId = req.body.roomTypeId;
    room.roomName = req.body.roomName;
    room.roomDesc = req.body.roomDesc;
    room.roomIcon = req.body.roomIcon;
    room.roomOwner = req.params.uid;
    room.save((err)=>{
        if (err) {
            res.json({
            status: "error",
            id: err,
            message: "Thêm phòng thất bại"
            }); 
        } else {
            res.json({
                status: "success",
                id: "add_room_success",
                message: "Thêm phòng thành công"
            });
        }
    })
    
}
module.exports.getRooms = (req, res) => {
    roomsModel.find({'roomOwner':req.params.uid}, (err, rooms)=> {
        if (err) {
            res.json({
                status: "error",
                message: err
            })
        } else {
            res.json(rooms);
        }
    })
}