
const Sequelize = require('sequelize');

const seq = require('../util/database')



const water_meter =seq.define('water_meter',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },model:{
        type:Sequelize.STRING,
        allowNull:false
    },
    maker:{
        type:Sequelize.FLOAT,
        allowNull:false
    },location:{
        type:Sequelize.STRING,
        allowNull:false
    },power:{
        type:Sequelize.STRING,
        allowNull:false
    },installation_date:{
        type:Sequelize.DATE,
        allowNull:false
    },item_weight:{
        type:Sequelize.FLOAT,
        allowNull:false
    }



});

module.exports = water_meter;


