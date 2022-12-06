const electric_meter = require("../model/electricity_meter");
const water_meter = require("../model/water_meter");
const light = require("../model/light");
const fan = require("../model/fan");
const camera = require("../model/camera");


exports.getDeviceInformation = async (req,res,next)=>{

    const device = req.body.device;

    switch(device){
        case "fan":
            await getFans(req,res,next);
            break;
        case "camera":
            await getCameras(req,res,next);
            break;
        case "light":
            await getLights(req,res,next);
            break;
        case "water_meter":
            await getWaterMeters(req,res,next);
            break;
        case "electric_meter":
            await getElectricMeters(req,res,next);
            break;
    }



}



const getElectricMeters = async (req,res,next)=>{

    const data =  await electric_meter.findAll({where: { id:req.session.userId}} );
    //console.log(data);
    res.json({
        "status":200,
        "data":data
    })
}

const getWaterMeters = async (req,res,next)=>{


    const data=  await water_meter.findAll({where: { id:req.session.userId}});
    res.json({
        "status":200,
        "data":data
    })
}

const getLights = async(req,res,next)=>{

    const data = await light.findAll({where: { id: req.session.userId }});
    res.json({
        "status":200,
        "data":data
    })
}

const getFans = async(req,res,next)=>{

    const data = await fan.findAll({where: { id: req.session.userId }});
    res.json({
        "status":200,
        "data":data
    })


}

const getCameras = async(req,res,next)=>{

    const data = await camera.findAll({where: { id: req.session.userId }});
    res.json({
        "status":200,
        "data":data
    })
}






