
const Sequelize = require('sequelize');

const seq = require('../util/database')



const fan =seq.define('fan',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
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
    },location:{
        type:Sequelize.STRING,
        allowNull:false
    },num_speeds:{
        type:Sequelize.STRING,
        allowNull:false
    },power:{
        type:Sequelize.STRING,
        allowNull:false
    },installation_date:{
        type:Sequelize.STRING,
        allowNull:false
    },userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    deployment_date:{
        type:Sequelize.STRING,
        allowNull:false
    },
    dimensions:{
        type:Sequelize.STRING,
        allowNull:false
    },maxSpeed:{
        type:Sequelize.STRING,
        allowNull:false
    },




});

module.exports = fan;


