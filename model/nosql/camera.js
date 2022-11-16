
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const camera = new Schema({

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
    power:{
        type:Schema.Types.Number,
        required:true
    },
    status:{
        type:Schema.Types.Boolean,
        required:true
    },start_time:{
        type:Schema.Types.Number,
        required:true,
    },
    running_time:{
        type:Schema.Types.Number,
        required:true,
    }

    });

module.exports = mongoose.model('cameras', camera);
