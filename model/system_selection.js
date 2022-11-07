
const Sequelize = require('sequelize');

const users = require('./user.js');
const lights = require('./light');
const cameras = require('./camera');
const electricity_meters = require('./electricity_meter');
const fans = require('./fan');
const water_meters = require('./water_meter');
const weather_sensors = require('./weather_sensor');

const seq = require('../util/database')

//todo

const ss =seq.define('system_Selection',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    user_id:{
        references:     users,
        referencesKey:  'id'
    },
    camera_id:{
        references:     cameras,
        referencesKey:  'id'
    },weather_sensor_id:{
        references:    weather_sensors,
        referencesKey:  'id'
    },
    light_id:{
        references:     lights,
        referencesKey:  'id'
    },fan_id:{
        references:     fans,
        referencesKey:  'id'
    },electricity_meter_id:{
        references:     electricity_meters,
        referencesKey:  'id'
    },water_meter_id:{
        references:     water_meters,
        referencesKey:  'id'
    }


});

module.exports = ss;


