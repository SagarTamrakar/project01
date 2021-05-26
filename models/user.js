const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const cookieParser = require('cookie-parser')


const userSchema =  new mongoose.Schema({
    userName : {
        type : String,
        minlength : 3,
        maxlength : 25,
        required : 'Name Field Is Mandatory'
    },
    password :{
        type : String,
        minlength : 4,
        required : 'Invalid Password'
    },
    mobile:{
        type : Number,
        required : 'Correct Mobile no. required'
    },
    email :{
        type : String,
        unique : true,
        minlength : 5,
        maxlength : 255
    }
    // tokens :[{
    //     token : {
    //         type:String,
    //         required : true
    //     }
    // }]
    // isAdmin : Boolean
});
//validate email with path and validation method of mongoose
userSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},'Invalid Email.');

userSchema.methods.generateAuthenticationToken = function(){
try{
    const token = jwt.sign({_id : this._id},config.get('jwtPrivateKey'));
    // this.tokens = await this.tokens.concat({token:token})
    // console.log(token);
    // await this.save();
    return token;
}
catch(ex){
    console.log(ex);
}
}

const User = mongoose.model('User',userSchema);

module.exports.User = User;
