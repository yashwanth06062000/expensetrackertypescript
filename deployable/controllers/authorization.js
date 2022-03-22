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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const jwt = require('jsonwebtoken')
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const user=require("../models/usersignup")
const usersignup_1 = __importDefault(require("../models/usersignup"));
// require('dotenv').config();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authenticate() { }
exports.default = authenticate;
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('authorization');
        console.log(token);
        const userId = Number(jsonwebtoken_1.default.verify(token, process.env.Tokensecrect));
        yield usersignup_1.default.findByPk(userId).then((user) => {
            req.user = user;
            next();
        }).catch(err => console.log(err));
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ message: 'from authentication', success: false });
    }
});
