
const fan_nosql = require('../model/nosql/fan');
const light_nosql = require('../model/nosql/light');
const camera_nosql = require('../model/nosql/camera');
const electric_meter_nosql = require('../model/nosql/electric_meter');
const water_meter_nosql = require('../model/nosql/water_meter');
const weather_sensor_nosql = require('../model/nosql/weather_sensor');

exports.changeStateToStart = async (req,res,next)=>{
    let device = req.body.type;
    const temp = req.body.data;
    const status=true;
    //console.log(req.body);
    switch(device){
        case "fan":
            await fan_nosql.findOneAndUpdate({id:temp.id},{ status:status, start_time:Math.floor(Date.now() / 1000)})
            break;
        case "camera":
            await camera_nosql.findOneAndUpdate({id:temp.id},{ status:status, start_time:Math.floor(Date.now() / 1000)})
            break;
        case "light":
            await light_nosql.findOneAndUpdate({id:temp.id},{ status:status, start_time:Math.floor(Date.now() / 1000)})
            break;
        case "water_meter":
            await water_meter_nosql.findOneAndUpdate({id:temp.id},{ status:status, start_time:Math.floor(Date.now() / 1000)})
            break;
        case "electric_meter":
            await electric_meter_nosql.findOneAndUpdate({id:temp.id},{status:status})
            break;
        case "weather_sensor":
            await weather_sensor_nosql.findOneAndUpdate({id:temp.id},{status:status})
            break;

    }


    res.json({

        "status":200,
        "message":`success, ${req.body.type} state changed to true`

    })
}







exports.changeStateToStop = async (req,res,next)=>{
    let device = req.body.type;
    const temp = req.body.data;
    const status=false;

    //console.log(req.body);
    switch(device){
        case "fan":
            fan_nosql.findOne({'id':temp.id}).then(async (result)=> {

                const newRunningTime = result.running_time + Math.floor(Date.now() / 1000) - result.start_time;
                await fan_nosql.findOneAndUpdate({id:temp.id},{running_time: newRunningTime, status:status, start_time:0})

            }).then(err=>{
                //console.log(err);
            });
            break;
        case "camera":
            camera_nosql.findOne({'id':temp.id}).then(async (result)=> {

                const newRunningTime = result.running_time + Math.floor(Date.now() / 1000) - result.start_time;
                await camera_nosql.findOneAndUpdate({id:temp.id},{running_time: newRunningTime, status:status, start_time:0})

            }).then(err=>{
                //console.log(err);
            });
            break;
        case "light":
            light_nosql.findOne({'id':temp.id}).then(async (result)=> {

                const newRunningTime = result.running_time + Math.floor(Date.now() / 1000) - result.start_time;
                await light_nosql.findOneAndUpdate({id:temp.id},{running_time: newRunningTime, status:status, start_time:0})

            }).then(err=>{
                //console.log(err);
            });
            break;
        case "water_meter":
            water_meter_nosql.findOne({'id':temp.id}).then(async (result)=> {

                const newRunningTime = result.running_time + Math.floor(Date.now() / 1000) - result.start_time;
                await water_meter_nosql.findOneAndUpdate({id:temp.id},{running_time: newRunningTime, status:status, start_time:0})

            }).then(err=>{
                //console.log(err);
            });
            break;
        case "electric_meter":
            await electric_meter_nosql.findOneAndUpdate({id:temp.id},{status:status})
            break;
        case "weather_sensor":
            await weather_sensor_nosql.findOneAndUpdate({id:temp.id},{status:status})
            break;

    }
    res.json({

        "status":200,
        "message":`success, ${req.body.type} state changed to false`

    })
}



exports.getAllDevices = async(req,res,next)=>{
    let device = req.body.type;
    const status=false;
    switch(device){
        case "fan":
            await getDevices(req,res,next,fan_nosql);
            break;
        case "camera":
            await getDevices(req,res,next,camera_nosql);
            break;
        case "light":
            await getDevices(req,res,next,light_nosql);
            break;
        case "water_meter":
            await getDevices(req,res,next,water_meter_nosql);
            break;
        case "electric_meter":
            await getDevices (req,res,next,electric_meter_nosql);
            break;
        case "weather_sensor":
            await getDevices (req,res,next,weather_sensor_nosql);
            break;

    }
}

// by userId
const getDevices = async(req,res,next,device)=>{
    const data = await device.find({user_id:req.body.data.id});

    res.json({
        "status":200,
        "data": data
    })

}
