
const Sequelize = require('sequelize');

const seq = require('../util/database')



const camera =seq.define('camera',{
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
    },
    sensor_size:{
        type: Sequelize.STRING,
        allowNull: false
    },lens:{
        type: Sequelize.STRING,
        allowNull: false
    },resolution:{
        type: Sequelize.STRING,
        allowNull: false
    },userId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },location:{
        type: Sequelize.STRING,
        allowNull: false
    },installation_date:{
        type:Sequelize.STRING,
        allowNull:false
    },
    deployment_date:{
        type:Sequelize.STRING,
        allowNull:false
    },power:{
        type:Sequelize.STRING,
        allowNull:false
    }


});

module.exports = camera;


