
const Sequelize = require('sequelize');

const seq = require('../util/database')



const user =seq.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    firstName:{
            type:Sequelize.STRING,
            allowNull:false
        },
    lastName:{
            type:Sequelize.STRING,
            allowNull:false
    }
    ,password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }


});

module.exports = user;


