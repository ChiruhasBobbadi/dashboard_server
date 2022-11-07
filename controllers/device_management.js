const User = require("../model/user");
const electric_meter = require('../model/electricity_meter');

const water_meter = require('../model/water_meter');
const light = require('../')
exports.deleteDevice = (req,res,next)=>{

}


exports.updateDevice = (req,res,next)=>{

}



exports.addDevice = async(req,res,next)=>{

    console.log(req.body);
    let device = req.body.type;

    switch(device){
        case "fan":

            break;
        case "light":
            break;
        case "camera":
            break;
        case "light":
            await addLight(req,res,next);
            break;
        case "water_meter":
          await  addWaterMeter(req,res,next);
            break;
        case "electric_meter":
           await addElectricMeter (req,res,next);
            break;
    }
}

const addElectricMeter = async (req,res,next)=>{
    const data = req.body.data;


    await electric_meter.create({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        amperage_capacity:data.amperage_capacity,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        installation_method:data.installation_method,
        measurement_accuracy:data.measurement_accuracy,

    });
    res.json({
        "status":200,
        "message":"success, electric meter added"
    })
}

const addWaterMeter = async (req,res,next)=>{
    const data = req.body.data;


    await water_meter.create({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        item_weight:data.weight,
         batteries_included:data.batteries_included=="yes"?true:false,
        battery_cell_type:data.battery_cell_type

    });
    res.json({
        "status":200,
        "message":"success, water meter added"
    })
}

const addLight = async(req,res,next)=>{
    const data = req.body.data;


    await water_meter.create({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        item_weight:data.weight,
        batteries_included:data.batteries_included=="yes"?true:false,
        battery_cell_type:data.battery_cell_type

    });
    res.json({
        "status":200,
        "message":"success, Light added"
    })
}
