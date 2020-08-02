let bcrypt = require("bcryptjs");
let userModel = require("../models/users.model");
module.exports.userCreate = (req,res,next) => {
    
    userModel.findOne({ username: req.body.username }, (err, exists) => {
        if (exists) {
            res.json({
                status : "error",
                id: "username_existed",
                message: "Tài khoản đã tồn tại"
            });
            return;
        } else next();
    });
}

module.exports.login = (req, res, next) => {
    userModel.findOne({username: req.body.username}, (err, user) => {
        if (!user) {
            res.json({
                status: "error",
                id: "username_not_found",
                message: "Tài khoản không tồn tại"
            });
            return;
        } else 
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    status: "error",
                    id: "password_incorrect",
                    message: "Mật khẩu không chính xác"
                });

                return;
            } else {
                req.name = user.name;
                req.uid = user._id;
                next();
            }
    })
}
module.exports.addRoom = (req, res, next) => {
    userModel.findOne({'_id': req.params.uid}, (err, user) => {
        if (err) {res.json({
            status: "error",
            id: "uid_not_exists",
            message: "Tài khoản không tồn tại"
        })} else 
            if ((req.params.uid) == null || (req.params.uid) == "") {res.json({
                status: "error",
                id: "uid_not_found",
                message: "Uid missing"
            })} else next();
    })
}
module.exports.getRooms = (req, res, next) => {
    userModel.findOne({'_id': req.params.uid}, (err, user) => {
        if (err) {res.json({
            status: "error",
            id: "uid_not_exists",
            message: "Tài khoản không tồn tại"
        })} else 
            if ((req.params.uid) == null || (req.params.uid) == "") {res.json({
                status: "error",
                id: "uid_not_found",
                message: "Uid missing"
            })} else next();
    })
}