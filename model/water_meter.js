
const Sequelize = require('sequelize');

const seq = require('../util/database')



const water_meter =seq.define('water_meter',{
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
    },
    manufacturer:{
        type:Sequelize.STRING,
        allowNull:false
    },location:{
        type:Sequelize.STRING,
        allowNull:false
    },power:{
        type:Sequelize.STRING,
        allowNull:false
    },installation_date:{
        type:Sequelize.STRING,
        allowNull:false
    },item_weight:{
        type:Sequelize.STRING,
        allowNull:false
    },userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },batteries_included:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    battery_cell_type:{
        type:Sequelize.STRING,
        allowNull:false
    },deployment_date:{
        type:Sequelize.STRING,
        allowNull:false
    },
    metric:{
        type:Sequelize.FLOAT,
        allowNull:false
    }



});

module.exports = water_meter;


