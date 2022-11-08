const User = require("../model/user");
const electric_meter = require('../model/electricity_meter');

const water_meter = require('../model/water_meter');
const light = require('../model/light');

const fan = require('../model/fan')
const camera = require('../model/camera');


exports.deleteDevice = async(req,res,next)=>{

    let device = req.body.type;

    switch(device){
        case "fan":
            await deleteFan(req,res,next);
            break;
        case "camera":
            await deleteCamera(req,res,next);
            break;
        case "light":
            await deleteLight(req,res,next);
            break;
        case "water_meter":
            await deleteWaterMeter(req,res,next);
            break;
        case "electric_meter":
            await deleteElectricMeter (req,res,next);
            break;
    }

}

const deleteElectricMeter = async (req,res,next)=>{
    const data = req.body.data;
    await electric_meter.destroy({where: { id: data.id }} );

    res.json({
        "status":200,
        "message":"success, electric meter deleted"
    })
}

const deleteWaterMeter = async (req,res,next)=>{
    const data = req.body.data;


    await water_meter.destroy({where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, water meter deleted"
    })
}

const deleteLight = async(req,res,next)=>{
    const data = req.body.data;

    await light.destroy({where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, Light deleted"
    })
}

const deleteFan = async(req,res,next)=>{

    const data = req.body.data;

    await fan.destroy({where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, Fan deleted"
    })


}

const deleteCamera = async(req,res,next)=>{

    const data = req.body.data;

    await camera.destroy({where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, camera deleted"
    })
}


exports.updateDevice = async(req,res,next)=>{


    let device = req.body.type;

    switch(device){
        case "fan":
            await updateFan(req,res,next);
            break;
        case "camera":
            await updateCamera(req,res,next);
            break;
        case "light":
            await updateLight(req,res,next);
            break;
        case "water_meter":
            await updateWaterMeter(req,res,next);
            break;
        case "electric_meter":
            await updateElectricMeter (req,res,next);
            break;
    }

}


// requires the type of device, user id to which the device belongs and the device id
const updateElectricMeter = async (req,res,next)=>{
   const data = req.body.data;
    await electric_meter.update({
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

    }, {where: { id: data.id }} );
    res.json({
        "status":200,
        "message":"success, electric meter updated"
    })
}

const updateWaterMeter = async (req,res,next)=>{
    const data = req.body.data;


    await water_meter.update({
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

    },{where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, water meter updated"
    })
}

const updateLight = async(req,res,next)=>{
    const data = req.body.data;

    await light.update({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        power:data.power,
        wattage:data.wattage,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        illumination:data.illumination,

    },{where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, Light updated"
    })
}

const updateFan = async(req,res,next)=>{

    const data = req.body.data;

    await fan.update({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        maxSpeed:data.maxSpeed,
        num_speeds:data.num_speeds,


    },{where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, Fan updated"
    })


}

const updateCamera = async(req,res,next)=>{

    const data = req.body.data;

    await camera.update({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        running_time:data.running_time,
        down_time:data.down_time,
        sensor_size:data.sensor_size,
        lens:data.lens,
        resolution:data.resolution,


    },{where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, camera updated"
    })
}

//requires the type of device, user id to which the device belongs and the device id

exports.addDevice = async(req,res,next)=>{

    console.log(req.body);
    let device = req.body.type;

    switch(device){
        case "fan":
           await addFan(req,res,next);
            break;
        case "camera":
            await addCamera(req,res,next);
            break;
        case "light":
            await addLight(req,res,next);
            break;
        case "water_meter":
          await addWaterMeter(req,res,next);
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

    await light.create({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        power:data.power,
        wattage:data.wattage,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        illumination:data.illumination,

    });
    res.json({
        "status":200,
        "message":"success, Light added"
    })
}

const addFan = async(req,res,next)=>{

    const data = req.body.data;

    await fan.create({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        maxSpeed:data.maxSpeed,
        num_speeds:data.num_speeds,


    });
    res.json({
        "status":200,
        "message":"success, Fan added"
    })


}

const addCamera = async(req,res,next)=>{

    const data = req.body.data;

    await camera.create({
        user_id: req.session.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        running_time:data.running_time,
        down_time:data.down_time,
        sensor_size:data.sensor_size,
        lens:data.lens,
        resolution:data.resolution,


    });
    res.json({
        "status":200,
        "message":"success, camera added"
    })
}
