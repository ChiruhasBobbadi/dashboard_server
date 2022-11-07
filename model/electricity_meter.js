
const Sequelize = require('sequelize');

const seq = require('../util/database')



const electricity_meter =seq.define('electricity_meter',{
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
    },amperage_capacity:{
        type:Sequelize.FLOAT,
        allowNull:false
    },power:{
        type:Sequelize.STRING,
        allowNull:false
    },installation_date:{
        type:Sequelize.DATE,
        allowNull:false
    }



});

module.exports = electricity_meter;


