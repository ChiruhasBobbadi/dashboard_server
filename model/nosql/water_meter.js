
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  water = new Schema({

    id:{
        type:Schema.Types.String,
        required:true
    },
    user_id:{
        type:Schema.Types.Number,
        required:true
    },
    name:{
        type:Schema.Types.String,
        required:true
    },
    location:{
        type:Schema.Types.String,
        required:true
    },
    status:{
        type:Schema.Types.Boolean,
        required:true
    },
    metric:{
        type:Schema.Types.Decimal128,
    },
    running_time:{
        type:Schema.Types.Number,
        required:true},
    start_time:{
        type:Schema.Types.Number,
        required:true
    }

});

module.exports = mongoose.model('water_meter', water);
