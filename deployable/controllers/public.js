"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const encript = require('bcryptjs');
const user = require('../models/usersignup');
const ledb = require("../models/leaderboard");
const jwt = require('jsonwebtoken');
function generateAccessTocken(id) {
    return jwt.sign(id, process.env.Tokensecrect);
}
exports.addUser = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const emain = req.body.email;
    const mobileno = req.body.phone;
    const password = req.body.password;
    const hashpassword = yield encript.hash(password, 10);
    var exsitinguser = undefined;
    yield user.findAll({ where: { name: name, email: emain } })
        .then((res) => {
        console.log(res[0]);
        existinguser = res[0];
    });
    if (existinguser == undefined) {
        yield user.create({ name: name,
            email: emain,
            phoneno: mobileno,
            password: hashpassword }).then((result) => {
            ledb.create({ UserId: result.id,
                username: result.name,
            }).then(() => {
                res.json({ message: "user Created Successfully", Success: true });
            });
        }).catch(err => console.log(err));
    }
    else {
        res.json({ message: "useralready exsits", Success: false });
    }
}));
exports.login = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    user.findAll({ where: { email: email } }).then(result => {
        if (result[0] != undefined) {
            encript.compare(password, result[0].password, function (err, response) {
                if (err) {
                    console.log(result[0].name);
                    return res.json({ success: false, message: 'Something went wrong' });
                }
                if (response) {
                    console.log("i am here inside response");
                    const jwttoken = generateAccessTocken(result[0].id);
                    res.json({ token: jwttoken, success: true, message: 'Successfully Logged In' });
                }
                else {
                    console.log("i am here inside not found");
                    return res.status(401).json({ success: false, message: 'passwords do not match' });
                }
            });
        }
        else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    }).catch(err => console.log(err));
}));
