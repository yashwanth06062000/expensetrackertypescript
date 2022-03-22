"use strict";
const sequelize = require("sequelize");
const Sequelize = new sequelize('Expense_Tracker', 'root', 'Thisonlyme@1', {
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = Sequelize;
