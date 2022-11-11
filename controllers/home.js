
const fan_nosql = require('../model/nosql/fan');
const light_nosql = require('../model/nosql/light');
const camera_nosql = require('../model/nosql/camera');
const electric_meter_nosql = require('../model/nosql/electric_meter');
const water_meter_nosql = require('../model/nosql/water_meter');
const weather_sensor_nosql = require('../model/nosql/weather_sensor');



exports.getHome = async (req,res,next)=>{
    await getAllDeviceMetrics(req,res,next);
}

const getAllDeviceMetrics = async (req,res,next)=>{

        const user_id = req.session.user_id;

        const fanMetrics = await getFanMetrics(user_id);

        const lightMetrics = await getLightMetrics(user_id);

        const weatherSensorMetrics = await getWeatherSensorMetrics(user_id);

        const cameraMetrics = await getCameraMetrics(user_id);

        const electricityMeterMetrics = await getElectricityMeterMetrics(user_id);

        const waterMeterMetrics = await getWaterMeterMetrics(user_id);

        res.json({
            "status":200,
            "message":"success, All devices metrics are fetched",
            "fanMetrics" : fanMetrics,
            "lightMetrics" : lightMetrics,
            "weatherSensorMetrics" : weatherSensorMetrics,
            "cameraMetrics" : cameraMetrics,
            "electricityMeterMetrics" : electricityMeterMetrics,
            "waterMeterMetrics" : waterMeterMetrics
        })

    }


    async function getFanMetrics(user_id) {
        const fans = await fan_nosql.find(user_id);

        let fanMetrics = 0;

        for (const fansKey in fans) {
            fanMetrics += ( Math.floor(Date.now() / (1000*60*60)) - fansKey.start_time + fansKey.running_time ) * fansKey.power;
        }
        return fanMetrics;
    }

    async function getLightMetrics(user_id) {
        const lights = await light_nosql.find(user_id);

        let lightMetrics = 0;

        for (const lightsKey in lights) {
            lightMetrics += ( Math.floor(Date.now() / (1000*60*60)) - lightsKey.start_time + lightsKey.running_time ) * lightsKey.power;
        }
        return lightMetrics;
    }

    async function getWeatherSensorMetrics(user_id) {
        const weatherSensors = await weather_sensor_nosql.find(user_id);

        let weatherSensorMetrics = 0;

        for (const weatherSensorsKey in weatherSensors) {
            weatherSensorMetrics += ( Math.floor(Date.now() / (1000*60*60)) - weatherSensorsKey.start_time + weatherSensorsKey.running_time ) * weatherSensorsKey.power;
        }
        return weatherSensorMetrics;
    }

    async function getCameraMetrics(user_id) {
        const cameras = await camera_nosql.find(user_id);

        let cameraMetrics = 0;

        for (const camerasKey in cameras) {
            cameraMetrics += ( Math.floor(Date.now() / (1000*60*60)) - camerasKey.start_time + camerasKey.running_time ) * camerasKey.power;
        }
        return cameraMetrics;
    }

    async function getElectricityMeterMetrics(user_id) {
        const electricityMeters = await electric_meter_nosql.find(user_id);

        let electricityMeterMetrics = 0;

        for (const electricityMetersKey in electricityMeters) {
            electricityMeterMetrics += electricityMetersKey.utilization;
        }
        return electricityMeterMetrics;
    }

    async function getWaterMeterMetrics(user_id) {
        const waterMeters = await water_meter_nosql.find(user_id);

        let waterMeterMetrics = 0;

        for (const waterMetersKey in waterMeters) {
            waterMeterMetrics += waterMetersKey.utilization;
        }
        return waterMeterMetrics;
    }
