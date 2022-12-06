
const Sequelize = require('sequelize');

const seq = require('../util/database')



const electricity_meter =seq.define('electricity_meter',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },model:{
        type:Sequelize.STRING,
        allowNull:false
    },location:{
        type:Sequelize.STRING,
        allowNull:false
    },amperage_capacity:{
        type:Sequelize.STRING,
        allowNull:false
    },power:{
        type:Sequelize.STRING,
        allowNull:false
    },installation_date:{
        type:Sequelize.STRING,
        allowNull:false
    },deployment_date: {
        type:Sequelize.STRING,
        allowNull:false
    },installation_method:{
        type:Sequelize.STRING,
        allowNull:false
    },
    measurement_accuracy:{
        type:Sequelize.STRING,
        allowNull:false
    },userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    manufacturer:{
        type:Sequelize.STRING,
        allowNull:false
    }



});

module.exports = electricity_meter;


