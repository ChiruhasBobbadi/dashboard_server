const fan_noSql = require('../model/nosql/fan');
const lights_noSql = require('../model/nosql/light');
const camera_noSql = require('../model/nosql/camera');
const water_nosql = require('../model/nosql/water_meter');
const User = require('../model/user');


exports.billing = async (req,res,next)=>{

    // get fan, light, camera power utilization
    // get water utilization

    const user= await User.findAll({
        where: { id: req.body.data.userId }
    });


    console.log(user[0]);

    console.log(req.body.data);
    // california KWH cost
    const electric_metric = 0.28;

    const fans = await fan_noSql.find({userId:req.body.data.userId});

    let totalPower=0;

    for(let fan of fans){
        let running_time = fan.running_time+ Math.floor(Date.now() / 1000) - fan.start_time
        totalPower+= fan.power*(running_time/3600);
    }

    const lights = await lights_noSql.find({userId:req.body.data.userId});


    for(let light of lights){
        console.log(light);
        let running_time = light.running_time+ Math.floor(Date.now() / 1000) - light.start_time

        totalPower+= light.power*(running_time/3600);
    }


    const cameras = await camera_noSql.find({userId:req.body.data.userId});
    console.log(cameras);
    for(let c of cameras){
        let running_time = c.running_time+ Math.floor(Date.now() / 1000) - c.start_time
        totalPower+= c.power*(running_time/3600);
    }

   totalPower/=1000;
    let totalCostPower = totalPower*electric_metric;


    // getting water information
    //todo
    const water_metric = 0.15;
    const waterUtilization = await water_nosql.find({user_id: req.body.data.userId});
    let totalWaterUtilization=0;
    for(let water of waterUtilization){
        let running_time = water.running_time+ Math.floor(Date.now() / 1000) - water.start_time;
        totalWaterUtilization +=water.metric*(running_time);

    }

    const totalCostWater = water_metric*totalWaterUtilization;

    const response = {
        status:200,
        waterUtilization : totalWaterUtilization,
        electricityUtilization : totalPower,
        waterCost:totalCostWater,
        electricityCost:totalCostPower,
        electric_metric:electric_metric,
        water_metric:water_metric,
        name: user[0].dataValues.firstName+ " "+user[0].dataValues.lastName
    }

    console.log(response);

    res.json(response);
}
