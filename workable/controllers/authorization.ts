// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken';
// const user=require("../models/usersignup")
import user from '../models/usersignup';

// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

export default function authenticate async(req, res, next) {
    try {
        const token = req.header('authorization')
        console.log(token)
       
        const userId = Number(jwt.verify(token, process.env.Tokensecrect))
       await user.findByPk(userId).then((user)=>{
        
            req.user =user
        next()
        }).catch(err=>console.log(err))
        
    }catch(err) {
        console.log(err)
        return res.status(404).json({message: 'from authentication', success: false})
    }
}