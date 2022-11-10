
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  light = new Schema({

    id:{
        type:Schema.Types.String,
        required:true
    },
    user_id:{
        type:Schema.Types.Number,
        required:true
    }, power:{
        type:Schema.Types.Number,
        required:true
    },location:{
        type:Schema.Types.String,
        required:true
    },
        status:{
            type:Schema.Types.Boolean,
            required:true
        },start_time:{
        type:Schema.Types.Number,
            required:true
    },utilization:{
        type:Schema.Types.Number,
            required:true
    },running_time:{
        type:Schema.Types.Number,
            required:true
    }
    });

module.exports = mongoose.model('lights', light);
