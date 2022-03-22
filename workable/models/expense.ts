const db=require('../utils/db')
const sequelize=require('sequelize')
const expense=db.define('Expenses',{
    ctegory:{
        type:sequelize.STRING,
        allowNull:false
    },
    description:{
        type:sequelize.STRING,
        allowNull:false
    },
    money:{
        type:sequelize.STRING,
        allowNull:false
    }
})
module.exports=expense;