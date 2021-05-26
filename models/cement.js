const Joi = require('joi');
const mongoose = require('mongoose');

const cementSchema = new mongoose.Schema({

    date : {
        type:Date,
        required:'date not mentioned'
    },
    rate : {
        type : Number,
        min : 0,
        required:'Mandatory Field'
    },
    qty :{
        type : Number,
        required : true,
        min : 0
    },
    total : {
        type:Number,
        required: 'Total Amount is required',
       
    }
});

const Cement = mongoose.model('Cement',cementSchema);

exports.Cement = Cement;
exports.cementSchema = cementSchema;