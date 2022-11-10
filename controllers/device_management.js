
const electric_meter = require('../model/electricity_meter');
const water_meter = require('../model/water_meter');
const light = require('../model/light');
const fan = require('../model/fan')
const camera = require('../model/camera');


const fan_nosql = require('../model/nosql/fan');
const light_nosql = require('../model/nosql/light');
const camera_nosql = require('../model/nosql/camera');
const electric_meter_nosql = require('../model/nosql/electric_meter');
const water_meter_nosql = require('../model/nosql/water_meter');

exports.getDevices = async(req,res,next)=>{

    let device = req.body.type;

    switch(device){
        case "fan":
            await getFan(req,res,next);
            break;
        case "camera":
            await getCamera(req,res,next);
            break;
        case "light":
            await getLight(req,res,next);
            break;
        case "water_meter":
            await getWaterMeter(req,res,next);
            break;
        case "electric_meter":
            await getElectricMeter (req,res,next);
            break;
    }
}

const getElectricMeter = async (req,res,next)=>{

   const data =  await electric_meter.findOne({where: { id:req.body.data.id }} );
    console.log(data);
    res.json({
        "status":200,
        "data":data
    })
}

const getWaterMeter = async (req,res,next)=>{


  const data=  await water_meter.findOne({where: { id:req.body.data.id}});
    res.json({
        "status":200,
        "data":data
    })
}

const getLight = async(req,res,next)=>{

    const data = await light.findOne({where: { id: req.body.data.id }});
    res.json({
        "status":200,
        "data":data
    })
}

const getFan = async(req,res,next)=>{

    const data = await fan.findOne({where: { id: req.body.data.id }});
    res.json({
        "status":200,
        "data":data
    })


}

const getCamera = async(req,res,next)=>{

   const data = await camera.findOne({where: { id: req.body.data.id }});
    res.json({
        "status":200,
        "data":data
    })
}



// todo deleting nosql device based on sql database deletion
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





//todo updating nosql values based on sql updation
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

   const light_data =  await light.update({
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
//todo nosql
const addElectricMeter = async (req,res,next)=>{
    const data = req.body.data;


   const electricData=  await electric_meter.create({
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

    // await electric_meter_nosql({
    //     user_id: req.session.userId,
    //     id:electricData.id,
    //     location:electricData.location,
    //     power:
    //     status:true,
    //     data:[]
    // }).save()
    res.json({
        "status":200,
        "message":"success, electric meter added"
    })
}

//todo nosql
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

    const lightData = await light.create({
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


    await light_nosql({
        user_id: req.session.userId,
        id:lightData.id,
        power:parseInt(lightData.power.split(" ")[0]),
        location:lightData.location,
        status:true,
        start_time:Math.floor(Date.now() / 1000),
        utilization:0,
        running_time:0
    }).save()


    res.json({
        "status":200,
        "message":"success, Light added"
    })
}

const addFan = async(req,res,next)=>{

    const data = req.body.data;

  const fanData =  await fan.create({
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


    await fan_nosql({
       user_id: req.session.userId,
       id:fanData.id,
        power:parseInt(fanData.power.split(" ")[0]),
        location:fanData.location,
        status:true,
        start_time:Math.floor(Date.now() / 1000),
        utilization:0,
        running_time:0
    }).save()





    res.json({
        "status":200,
        "message":"success, Fan added"
    })


}
//todo nosql
const addCamera = async(req,res,next)=>{

    const data = req.body.data;

   const cameraData= await camera.create({
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
        power:data.power

    });

    await camera_nosql({
        user_id: req.session.userId,
        id:cameraData.id,
        power:parseInt(cameraData.power.split(" ")[0]),
        location:cameraData.location,
        status:true,
        data:[]
    }).save()



    res.json({
        "status":200,
        "message":"success, camera added"
    })
}



