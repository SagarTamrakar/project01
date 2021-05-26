const Joi = require('joi');
const mongoose = require('mongoose');

const fertSchema = new mongoose.Schema({
    fertName : {
        type: Joi.string().min(3).max(50).required()
    },
    rate : {
        type : Joi.number().min(0).required()
    },
    dealerName : {
        type : Joi.string()
    },
    numberInStock : {
        type : Joi.number().min(0)
    }
});

const Fertilizer = mongoose.model('Fertilizer',fertSchema);

exports.fertSchema = fertSchema;
exports.Fertilizer = Fertilizer;
