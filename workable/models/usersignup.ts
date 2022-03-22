const db=require('../utils/db')
const sequelize=require('sequelize')
const user=db.define('User',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:sequelize.STRING,
        allowNull:false
    },
    email:{
        type:sequelize.STRING,
        allowNull:false
    },
    phoneno:{
        type:sequelize.STRING,
        allowNull:false
    },
    password:{
        type:sequelize.STRING,
        allowNull:false
    },
    ispremiumuser:{
        type:sequelize.BOOLEAN

    }

})
module.exports=user;