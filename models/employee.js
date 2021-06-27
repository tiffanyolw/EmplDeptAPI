const Sequelize = require("Sequelize");
const config = require("./../config");

const Employee = config.define("Employee", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type:   Sequelize.ENUM,
        values: ['male', 'female'],
        allowNull: false
    },
    salary: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
}, {timestamps: false});

module.exports = Employee;