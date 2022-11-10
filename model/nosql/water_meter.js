
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
    location:{
        type:Schema.Types.String,
        required:true
    },
    status:{
        type:Schema.Types.Boolean,
        required:true
    }, utilization:{
        type:Schema.Types.Number,
    }});

module.exports = mongoose.model('water_meter', water);
