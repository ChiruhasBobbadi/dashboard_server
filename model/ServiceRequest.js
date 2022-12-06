
const Sequelize = require('sequelize');

const seq = require('../util/database')



const service =seq.define('service',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    device:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    resolved:{
        type:Sequelize.BOOLEAN,
        defaultValue: false
    }


});

module.exports = service;


