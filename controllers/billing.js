const fan_noSql = require('../model/nosql/fan');
const lights_noSql = require('../model/nosql/light');
const camera_noSql = require('../model/nosql/camera');
const water_nosql = require('../model/nosql/water_meter');


exports.billing = async (req,res,next)=>{

    // get fan, light, camera power utilization
    // get water utilization


    // california KWH cost
    const electric_metric = 0.28;

    const fans = await fan_noSql.find({userId:req.session.userId});

    let totalPower=0;

    for(fan in fans){
        let running_time = fan.running_time+ Math.floor(Date.now() / 1000) - fan.start_time
        totalPower+= fan.power*(running_time/3600);
    }

    const lights = await lights_noSql.find({userId:req.session.userId});
    for(light in lights){
        let running_time = light.running_time+ Math.floor(Date.now() / 1000) - light.start_time
        totalPower+= light.power*(running_time/3600);
    }


    const cameras = await camera_noSql.find({userId:req.session.userId});
    for(camera in cameras){
        let running_time = camera.running_time+ Math.floor(Date.now() / 1000) - camera.start_time
        totalPower+= camera.power*(running_time/3600);
    }

    const totalCostPower = totalPower*electric_metric;

    // getting water information
    //todo
    const waterCost = 0.0015;
    const waterUtilization = await water_nosql.find({user_id: req.session.userId});
    let totalWaterUtilization=0;
    for(water in waterUtilization){
        let running_time = water.running_time+ Math.floor(Date.now() / 1000) - water.start_time;
        totalWaterUtilization +=water.metric*(running_time/3600);

    }

    const totalCostWater = waterCost*totalWaterUtilization;

    const response = {
        status:200,
        waterCost:totalCostWater,
        electricityCost:totalCostPower
    }

    res.json(response);
}
