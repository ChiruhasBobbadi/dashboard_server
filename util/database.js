
const Sequelize = require('sequelize');


const seq = new Sequelize('dashboard','root','Jaswanth@123',
    {dialect:'mysql',host:'127.0.0.1'});
module.exports = seq;
