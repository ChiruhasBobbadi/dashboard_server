
const Sequelize = require('sequelize');

const seq = require('../util/database')



const weather_sensor =seq.define('weather_sensor',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,

    },model:{
        type:Sequelize.STRING,
        allowNull:false
    },
    manufacturer:{
        type:Sequelize.STRING,
        allowNull:false
    },
    location:{
        type:Sequelize.STRING,
        allowNull:false
    },temperature_range:{
        type:Sequelize.STRING,
        allowNull:false
    },temperature_accuracy:{
        type:Sequelize.STRING,
        allowNull:false
    },installation_date:{
        type:Sequelize.STRING,
        allowNull:false
    },deployment_date:{
        type:Sequelize.STRING,
        allowNull:false
    },power:{
        type:Sequelize.STRING,
        allowNull:false
    },dimensions:{
        type:Sequelize.STRING,
        allowNull:false
    },userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }



});

module.exports = weather_sensor;


