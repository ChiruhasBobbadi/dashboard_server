
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
    switch(device){
        case "fan":

            break;
        case "camera":
            await changeUtilizationAndState(req,res,next,camera_nosql,status);
            break;
        case "light":
            await changeUtilizationAndState(req,res,next,light_nosql,status);
            break;
        case "water_meter":
            await changeUtilizationAndState(req,res,next,water_meter_nosql,status);
            break;
        case "electric_meter":
            await alterDeviceState (req,res,next,electric_meter_nosql,status);
            break;
        case "weather_sensor":
            await alterDeviceState (req,res,next,weather_sensor_nosql,status);
            break;

    }
}


// for meters
const alterDeviceState = async(req,res,next,device,status)=>{
    const data = req.body.data;

    await device.findOneAndUpdate({id:data.id},{status:status})


    res.json({

        "status":200,
        "message":`success, ${req.body.type} state changed to ${status}`

    })
}

// for light, fan camera and water meter
const changeUtilizationAndState = async(req,res,next,device,status)=>{
    const temp = req.body.data;
    console.log(temp.id);
    if(status){
        await fan_nosql.findOneAndUpdate({id:temp.id},{ status:status, start_time:Math.floor(Date.now() / 1000)})
    }else{

        fan_nosql.findOne({'id':temp.id}).then(async (result)=> {
            console.log(result);
            const newRunningTime = result.running_time + Math.floor(Date.now() / 1000) - result.start_time;
            await device.findOneAndUpdate({id:temp.id},{running_time: parseInt(newRunningTime), status:status, start_time:0})

        }).then(err=>{
            console.log(err);
        });




    }
    res.json({

        "status":200,
        "message":`success, ${req.body.type} state changed to ${status}`

    })
}


exports.changeStateToStop = async (req,res,next)=>{
    let device = req.body.type;
    const status=false;
    switch(device){
        case "fan":
            await changeUtilizationAndState(req,res,next,fan_nosql,status);
            break;
        case "camera":
            await changeUtilizationAndState(req,res,next,camera_nosql,status);
            break;
        case "light":
            await changeUtilizationAndState(req,res,next,light_nosql,status);
            break;
        case "water_meter":
            await changeUtilizationAndState(req,res,next,water_meter_nosql,status);
            break;
        case "electric_meter":
            await alterDeviceState (req,res,next,electric_meter_nosql,status);
            break;
        case "weather_sensor":
            await alterDeviceState (req,res,next,weather_sensor_nosql,status);
            break;

    }
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
