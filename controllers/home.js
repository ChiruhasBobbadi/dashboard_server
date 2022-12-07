
const fan_nosql = require('../model/nosql/fan');
const light_nosql = require('../model/nosql/light');
const camera_nosql = require('../model/nosql/camera');
const electric_meter_nosql = require('../model/nosql/electric_meter');
const water_meter_nosql = require('../model/nosql/water_meter');
const weather_sensor_nosql = require('../model/nosql/weather_sensor');
const water_nosql = require("../model/nosql/water_meter");



exports.getHome = async (req,res,next)=>{
    await getAllDeviceMetrics(req,res,next);
}

const getAllDeviceMetrics = async (req,res,next)=>{

    //console.log(req.body);
    const user_id = req.body.userId;
    
     console.log(user_id);

        const fanMetrics = await getFanMetrics(user_id);

        const lightMetrics = await getLightMetrics(user_id);

        const weatherSensorMetrics = await getWeatherSensorMetrics(user_id);

        const cameraMetrics = await getCameraMetrics(user_id);

        const electricityMeterMetrics = await getElectricityMeterMetrics(user_id);

        const waterMeterMetrics = await getWaterMeterMetrics(user_id);

        let data ={
            "status":200,
            "message":"success, All devices metrics are fetched",
            "fanMetrics" : fanMetrics,
            "lightMetrics" : lightMetrics,
            "weatherSensorMetrics" : weatherSensorMetrics,
            "cameraMetrics" : cameraMetrics,
            "electricityMeterMetrics" : electricityMeterMetrics,
            "waterMeterMetrics" : waterMeterMetrics
        };
    //console.log(data);

    res.json(data)

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
