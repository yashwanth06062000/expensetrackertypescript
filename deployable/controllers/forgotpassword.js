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
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const User = require("../models/usersignup");
const uuid = require('uuid');
const Forgotpassword = require("../models/ForgotPasswordRequests");
const encript = require('bcryptjs');
const passwordchangetable = require("../models/usersignup");
const NodeMailer = require('nodemailer');
dotenv.config();
exports.forgotpassword = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const id = uuid.v4();
    yield User.findAll({ where: { email: email } }).then((user) => {
        if (user) {
            user[0].createForgotpassword({ id: id, isactive: true })
                .catch(err => {
                throw new Error(err);
            });
            sgMail.setApiKey(process.env.Send_Grid_Api);
            const transporter = NodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: process.env.Mail_id,
                    pass: process.env.Password
                }
            });
            const msg = {
                to: email,
                from: 'developer06062000@gmail.com',
                subject: 'Link to Your Pasword changing @expenseTracker',
                text: 'Hie please find below link for your password changing',
                html: `<a href="http://localhost:3000/resetpassword/${id}">Reset password</a>`
            };
            transporter.sendMail(msg)
                .then((response) => {
                console.log("sendmail successfully");
                return res.json({ message: 'Link to reset password sent to your mail ', sucess: true });
            })
                .catch((error) => {
                console.log(error);
            });
        }
        else {
            throw new Error('User doesnt exist');
        }
    });
}));
exports.resetpassword = (req, res) => {
    const id = req.params.id;
    Forgotpassword.findOne({ where: { id } }).then(forgotpasswordrequest => {
        if (forgotpasswordrequest) {
            forgotpasswordrequest.update({ isactive: false });
            res.status(200).send(`<html>
                                    <form action="/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>Reset password</button>
                                    </form>
                                </html>`);
            res.end();
        }
    });
};
exports.updatepassword = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    const hashpassword = yield encript.hash(newpassword, 10);
    Forgotpassword.findAll({ where: { id: resetpasswordid } }).then((usertochange) => {
        passwordchangetable.findAll({ where: { id: usertochange[0].dataValues.UserId } }).then((us) => {
            console.log(us);
            us[0].update({ password: hashpassword }).then(() => {
                res.json({ message: "successfully changed the password" });
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}));
