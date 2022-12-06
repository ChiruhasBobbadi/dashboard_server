
const electric_meter = require('../model/electricity_meter');
const water_meter = require('../model/water_meter');
const light = require('../model/light');
const fan = require('../model/fan')
const camera = require('../model/camera');
const weather_sensor = require('../model/weather_sensor');


const fan_nosql = require('../model/nosql/fan');
const light_nosql = require('../model/nosql/light');
const camera_nosql = require('../model/nosql/camera');
const electric_meter_nosql = require('../model/nosql/electric_meter');
const water_meter_nosql = require('../model/nosql/water_meter');
const weather_sensor_nosql = require('../model/nosql/weather_sensor');

//START Fetching single device based on device id
exports.getDevice = async(req,res,next)=>{

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
        case "weather_sensor":
            await getWeatherSensor (req,res,next);
            break;

    }
}

const getElectricMeter = async (req,res,next)=>{

   const data =  await electric_meter.findOne({where: { id:req.body.data.id }} );
    //console.log(data);
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

    const id =req.body.data.id;
    const data = await light.findOne({where: { id: id}});
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

const getWeatherSensor = async(req,res,next)=>{

    const data = await weather_sensor.findOne({where: { id: req.body.data.id }});
    res.json({
        "status":200,
        "data":data
    })
}
//END Fetching devices End

//START Fetching all devices based on user id
exports.getAllDevices = async(req,res,next)=>{

    let device = req.body.type;

    switch(device){
        case "fan":
            await getAllFans(req,res,next);
            break;
        case "camera":
            await getAllCameras(req,res,next);
            break;
        case "light":
            await getAllLights(req,res,next);
            break;
        case "water_meter":
            await getAllWaterMeters(req,res,next);
            break;
        case "electric_meter":
            await getAllElectricMeters(req,res,next);
            break;
        case "weather_sensor":
            await getAllWeatherSensors(req,res,next);
            break;
    }
}

const getAllElectricMeters = async (req,res,next)=> {

    const data = await electric_meter.findAll({where: {userId: req.body.data.userId}});
    //console.log(data);
    res.json({
        "status": 200,
        "data": data
    })
}

const getAllWaterMeters = async (req,res,next)=>{


    const data=  await water_meter.findAll({where: {userId: req.body.data.id}});
    res.json({
        "status":200,
        "data":data
    })
}

const getAllLights = async(req,res,next)=>{

    const data = await light.findAll({where: {userId: req.body.data.userId}});
    res.json({
        "status":200,
        "data":data
    })
}

const getAllFans = async(req,res,next)=>{


    const data = await fan.findAll({where: {userId: req.body.data.id}});
    res.json({
        "status":200,
        "data":data
    })


}

const getAllCameras = async(req,res,next)=>{

    const data = await camera.findAll({where: {userId: req.body.data.userId}});
    res.json({
        "status":200,
        "data":data
    })
}

const getAllWeatherSensors = async(req,res,next)=>{

    const data = await weather_sensor.findAll({where: {user_id: req.body.data.id}});
    res.json({
        "status":200,
        "data":data
    })
}


//END Fetching all devices based on user id
// todo deleting nosql device based on sql database deletion

//START deleting single device based on device id
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
        case "weather_sensor":
            await deleteWeather(req,res,next);
            break;
    }

}

const deleteElectricMeter = async (req,res,next)=>{
    const data = req.body.data;
    await electric_meter.destroy({where: { id: data.id }} );
    await electric_meter_nosql.deleteOne({id: data.id});
    res.json({
        "status":200,
        "message":"success, electric meter deleted"
    })
}

const deleteWaterMeter = async (req,res,next)=>{
    const data = req.body.data;


    await water_meter.destroy({where: { id: data.id }});
    await water_meter_nosql.deleteOne({id: data.id});
    res.json({
        "status":200,
        "message":"success, water meter deleted"
    })
}

const deleteLight = async(req,res,next)=>{
    const data = req.body.data;

    await light.destroy({where: { id: data.id }});
    await light_nosql.deleteOne({id: data.id});
    res.json({
        "status":200,
        "message":"success, Light deleted"
    })
}

const deleteFan = async(req,res,next)=>{

    const data = req.body.data;

    await fan.destroy({where: { id: data.id }});
    await fan_nosql.deleteOne({id: data.id});
    res.json({
        "status":200,
        "message":"success, Fan deleted"
    })


}

const deleteCamera = async(req,res,next)=>{

    const data = req.body.data;

    await camera.destroy({where: { id: data.id }});
    await camera_nosql.deleteOne({id: data.id});
    res.json({
        "status":200,
        "message":"success, camera deleted"
    })
}

const deleteWeather = async(req,res,next)=>{
    const data = req.body.data;

    await weather_sensor.destroy({where: { id: data.id }});
    await weather_sensor_nosql.deleteOne({id: data.id});
    res.json({
        "status":200,
        "message":"success, weather sensor deleted"
    })
}

//END deleting single device based on device id



//START updating single device based on device id

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
        case "weather_sensor":
            await updateWeatherSensor (req,res,next);
            break;
    }

}

// requires the type of device, user id to which the device belongs and the device id
const updateElectricMeter = async (req,res,next)=>{
   const data = req.body.data;
    await electric_meter.update({
        userId: data.userId,
        name: data.device_name,
        model:data.model,
        location:data.location,
        amperage_capacity:data.amperage_capacity,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        installation_method:data.installation_method,
        measurement_accuracy:data.measurement_accuracy,
        manufacturer:data.manufacturer

    }, {where: { id: data.id }} );
    res.json({
        "status":200,
        "message":"success, electric meter updated"
    })
}

const updateWaterMeter = async (req,res,next)=>{
    const data = req.body.data;


    await water_meter.update({
        userId: data.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        item_weight:data.weight,
        batteries_included: data.batteries_included === "yes",
        battery_cell_type:data.battery_cell_type,
        metric:data.metric
    },{where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, water meter updated"
    })
}

const updateLight = async(req,res,next)=>{
    const data = req.body.data;

    //console.log(data);
    const light_data =  await light.update({
        userId: data.userId,
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
    //console.log(data);
    await fan.update({
        userId: data.userId,
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
    //console.log(data);

    await camera.update(
        {
        userId: data.userId,
        name: data.device_name,
        model:data.model,
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
    },{where: { id: data.id }});
    res.json({
        "status":200,
        "message":"success, camera updated"
    })
}

const updateWeatherSensor = async(req,res,next)=>{
    const data = req.body.data;

    await weather_sensor.update({
        userId: data.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        power:data.power,
        temperature_range: data.temperature_range,
        temperature_accuracy:data.temperature_accuracy


    },{where: { id: data.id }});

    res.json({
        "status":200,
        "message":"success, weather sensor updated"
    })
}

//END updating single device based on device id


//START adding single device based on device id


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
        case "weather_sensor":
            await addWeather(req,res,next);
    }
}

//todo nosql
const addElectricMeter = async (req,res,next)=>{
    const data = req.body.data;

    //console.log(data);
    await electric_meter.create({
        userId: data.userId,
        name: data.device_name,
        model:data.model,
        location:data.location,
        amperage_capacity:data.amperage_capacity,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        installation_method:data.installation_method,
        measurement_accuracy:data.measurement_accuracy,
        manufacturer:data.manufacturer
    });

    await electric_meter_nosql({
        user_id: data.userId,
        name: data.device_name,
        id:data.id,
        location:data.location,
        start_time:Math.floor(Date.now() / 1000),
        utilization:0,
        status:true

    }).save()
    res.json({
        "status":200,
        "message":"success, electric meter added"
    })
}


// water meter takes a initial metric of flow, which denotes the amount of water used per minute and we store the start time.
const addWaterMeter = async (req,res,next)=>{
    const data = req.body.data;


   const waterData= await water_meter.create({
        userId: data.userId,
        name: data.device_name,
        model:data.model,
        item_weight:data.item_weight,
        location:data.location,
        manufacturer:data.manufacturer,
        power:data.power,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        utilization:data.utilization,
        batteries_included:data.batteries_included === "yes",
        battery_cell_type:data.battery_cell_type,
        metric:data.metric

    });
//todo imp
    await water_meter_nosql({
        user_id: data.userId,
        name: data.device_name,
        id:waterData.id,
        location:data.location,
        metric:data.metric,
        start_time:Math.floor(Date.now() / 1000),
        utilization:0,
        status:true,
        running_time:0
    }).save()

    res.json({
        "status":200,
        "message":"success, water meter added"
    })
}

const addLight = async(req,res,next)=>{
    const data = req.body.data;
    //console.log(data);
    const light_data =  await light.create({
        userId: data.userId,
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
        user_id: data.userId,
        name: data.device_name,
        id:light_data.id,
        power:parseInt(data.power.split(" ")[0]),
        location:data.location,
        status:true,
        start_time:Math.floor(Date.now() / 1000),
        running_time:0
    }).save()


    res.json({
        "status":200,
        "message":"success, Light added"
    })
}


const addFan = async(req,res,next)=>{

    const data = req.body.data;



    const fanData = await fan.create({
        userId: data.userId,
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

    //console.log(data.userId);

    await fan_nosql({
       user_id: data.userId,
        id:fanData.id,
        name: data.device_name,
        power:parseInt(data.power.split(" ")[0]),
        location:data.location,
        status:true,
        start_time:Math.floor(Date.now() / 1000),
        running_time:0
    }).save()


    res.json({
        "status":200,
        "message":"success, Fan added"
    })


}

const addCamera = async(req,res,next)=>{

    const data = req.body.data;
    //console.log(data);
    const cameraData =  await camera.create({
        userId: data.userId,
        name: data.device_name,
        model:data.model,
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
        user_id: data.userId,
        name: data.device_name,
        id:cameraData.id,
        power:parseInt(data.power.split(" ")[0]),
        location:data.location,
        status:true,
        start_time:Math.floor(Date.now() / 1000),
        running_time:0
    }).save()



    res.json({
        "status":200,
        "message":"success, camera added"
    })
}

//todo weather nosql
const addWeather = async(req,res,next)=>{
    const data = req.body.data;

    await weather_sensor.create({
        user_id: data.userId,
        name: data.device_name,
        model:data.model,
        dimensions:data.dimensions,
        location:data.location,
        manufacturer:data.manufacturer,
        installation_date:data.installation_date,
        deployment_date:data.deployment_date,
        power:data.power,
        temperature_range: data.temperature_range,
        temperature_accuracy:data.temperature_accuracy

    });


    await weather_sensor_nosql({
        user_id: data.userId,
        name: data.device_name,
        id:data.id,
        temperature:data.temperature,
        location:data.location,
        status:true,
        start_time:Math.floor(Date.now() / 1000),
        running_time:0
    }).save()


    res.json({
        "status":200,
        "message":"success, weather sensor added"
    })
}

//END adding single device based on device id


