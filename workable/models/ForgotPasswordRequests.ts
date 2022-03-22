const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const forgotpassword=sequelize.define('forgotpassword',{
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    isactive:{
        type:Sequelize.BOOLEAN
    },
        
})

module.exports = forgotpassword;