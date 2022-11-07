
const Sequelize = require('sequelize');


const seq = new Sequelize('dashboard','root','Password@123',
    {dialect:'mysql',host:'localhost'});
module.exports = seq;
