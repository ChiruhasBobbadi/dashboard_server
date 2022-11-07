
const Sequelize = require('sequelize');

const seq = require('../util/database')



const camera =seq.define('camera',{
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
    maker:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    running_time: {
        type: Sequelize.TIME,
        allowNull: false
    },down_time:{
        type: Sequelize.TIME,
        allowNull: false
    },
    sensor_size:{
        type: Sequelize.STRING,
        allowNull: false
    },lens:{
        type: Sequelize.FLOAT,
        allowNull: false
    },resolution:{
        type: Sequelize.INTEGER,
        allowNull: false
    }


});

module.exports = camera;


