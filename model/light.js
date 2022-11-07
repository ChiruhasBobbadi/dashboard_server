
const Sequelize = require('sequelize');

const seq = require('../util/database')



const light =seq.define('light',{
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
    },location:{
        type:Sequelize.STRING,
        allowNull:false
    },illumination:{
        type:Sequelize.STRING,
        allowNull:false
    },wattage:{
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

module.exports = light;


