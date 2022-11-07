
const Sequelize = require('sequelize');

const seq = require('../util/database')



const fan =seq.define('fan',{
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
    },num_speeds:{
        type:Sequelize.INTEGER,
        allowNull:false
    },weight:{
        type:Sequelize.FLOAT,
        allowNull:false
    },power:{
        type:Sequelize.STRING,
        allowNull:false
    },installation_date:{
        type:Sequelize.DATE,
        allowNull:false
    },userId:{
        type:Sequelize.INTEGER
    }



});

module.exports = fan;


