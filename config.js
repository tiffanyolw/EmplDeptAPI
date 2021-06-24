const Sequelize = require("sequelize");
const config = new Sequelize("mango", "user", "", {dialect: "mysql"});

module.exports = config;