const fan_noSql = require('../model/nosql/fan');
const lights_noSql = require('../model/nosql/light');
const camera_noSql = require('../model/nosql/camera');
const water_nosql = require('../model/nosql/water_meter');
const User = require('../model/user');
const fan_nosql = require("../model/nosql/fan");
const light_nosql = require("../model/nosql/light");
const weather_sensor_nosql = require("../model/nosql/weather_sensor");
const camera_nosql = require("../model/nosql/camera");
const electric_meter_nosql = require("../model/nosql/electric_meter");


exports.billing = async (req,res,next)=>{

    let id = req.body.data.userId;

  let fans = await getFanMetrics(id);
  let lights = await getLightMetrics(id);
  let weather = await getWeatherSensorMetrics(id);
  let camera = await getCameraMetrics(id);
  let electric_meter = await getElectricityMeterMetrics(id);

  let water = await getWaterMeterMetrics(id);

    let electric_metric = 0.28
    let totalPower= ((fans+lights+camera+weather+electric_meter)/1000);


    const user= await User.findAll({
        where: { id: req.body.data.userId }
    });

    // getting water information

    const water_metric = 0.15;


    const totalCostWater = water_metric*water;

    const response = {
        status:200,
        waterUtilization : water,
        electricityUtilization : totalPower,

        waterCost:totalCostWater,
        electricityCost:totalPower*electric_metric,

        electric_metric:electric_metric,
        water_metric:water_metric,

        name: user[0].dataValues.firstName+ " "+user[0].dataValues.lastName
    }

    //console.log(response);

    res.json(response);
}

async function getFanMetrics(user_id) {
    const fans = await fan_nosql.find({user_id:user_id});

    let fanMetrics = 0;

    for (const fansKey of fans) {
        if(fansKey.status){
            fanMetrics += (( Math.floor(Date.now() / (1000)) - fansKey.start_time + fansKey.running_time )/3600 )* fansKey.power;
        }else{
            fanMetrics += ((fansKey.running_time )/3600)* fansKey.power;
        }

    }
    return fanMetrics;
}

async function getLightMetrics(user_id) {
    const lights = await light_nosql.find({user_id:user_id});

    let lightMetrics = 0;

    for (const lightKey of lights) {
        if(lightKey.status)
            lightMetrics += (( Math.floor(Date.now() / (1000)) - lightKey.start_time + lightKey.running_time )/3600 )* lightKey.power;
        else
            lightMetrics += ((lightKey.running_time )/3600)* lightKey.power;
    }
    return lightMetrics;
}

async function getWeatherSensorMetrics(user_id) {
    const weatherSensors = await weather_sensor_nosql.find({user_id:user_id});

    let weatherSensorMetrics = 0;

    for (const weatherSensorsKey of weatherSensors) {
        if(weatherSensorsKey.status)
            weatherSensorMetrics += (( Math.floor(Date.now() / (1000)) - weatherSensorsKey.start_time + weatherSensorsKey.running_time )/3600) * weatherSensorsKey.power;
        else
            weatherSensorMetrics += ((weatherSensorsKey.running_time )/3600)* weatherSensorsKey.power;

    }
    return weatherSensorMetrics;
}

async function getCameraMetrics(user_id) {
    const cameras = await camera_nosql.find({user_id:user_id});

    let cameraMetrics = 0;

    for (const camerasKey of cameras) {
        if(camerasKey.status)
            cameraMetrics += (( Math.floor(Date.now() / (1000)) - camerasKey.start_time + camerasKey.running_time )/3600) * camerasKey.power;
        else
            cameraMetrics += ((camerasKey.running_time )/3600)* camerasKey.power;
    }
    return cameraMetrics;
}

async function getElectricityMeterMetrics(user_id) {
    const electricityMeters = await electric_meter_nosql.find({user_id:user_id});

    let electricityMeterMetrics = 0;

    for (const electricityMetersKey of electricityMeters) {
        electricityMeterMetrics += electricityMetersKey.utilization;
    }
    return electricityMeterMetrics;
}

async function getWaterMeterMetrics(user_id) {
    const waterUtilization = await water_nosql.find({user_id: user_id});
    let totalWaterUtilization=0;

    for(let water of waterUtilization){
        if(water.status)
            totalWaterUtilization += (water.running_time+ Math.floor(Date.now() / 1000) - water.start_time)*(water.metric);
        else
            totalWaterUtilization += (water.running_time)*(water.metric);
    }
    return totalWaterUtilization;
}
