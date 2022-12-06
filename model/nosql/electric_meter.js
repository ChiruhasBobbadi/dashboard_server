
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  fan = new Schema({

    id:{
        type:Schema.Types.String,
        required:true
    },
    user_id:{
        type:Schema.Types.Number,
        required:true
    },name:{
        type:Schema.Types.String,
        required:true
    },location:{
        type:Schema.Types.String,
        required:true
    },
    status:{
        type:Schema.Types.Boolean,
        required:true
    },utilization:{
        type:Schema.Types.Number,
    }

    });

module.exports = mongoose.model('electric_meter', fan);




//{
//     "type": "camera",
//     "data": {
//
//
//         "name": "camera 1",
//         "model":"camera model 1",
//         "dimensions":"11.38 x 6.22 x 4.49 inches",
//         "location":"KING Library Building",
//         "manufacturer":"sony",
//         "installation_date":"08/19/22",
//         "deployment_date":"08/19/22",
//         "sensor_size":"2",
//         "lens":"1.5f",
//         "resolution":"1080 p",
//         "power":"15 watt"
//
//
//     }
// }



//

/*
{
    "type": "light",
    "data": {
    "device_name":"Light 1",
    "model" :"light model",
    "installation_date":"08/16/2022",
        "device_id":"WMETE001",
        "dimensions":"11.38 x 6.22 x 4.49 inches",
        "location":"KING Library Building" ,
        "deployment_date":"08/19/22",
        "manufacturer":"light brand",
	"power":"20 watts",
"wattage": "temp wattage",
"illumination":data.illumination

}
}
*/

