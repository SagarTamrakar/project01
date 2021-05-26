const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();
const _ = require('lodash'); 
const bcrypt = require('bcrypt');


router.get('/', (req,res)=>{
    res.render('home/login',{
        viewTitle: 'Insert Details of User'
    });
});

router.post('/',async(req,res)=>{
    
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User Already Exists');
    user = new User({
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password ,
        mobile : req.body.mobile ,

    });
        // const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,10);
        await user.save();

        const token = await user.generateAuthenticationToken();
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+60000)
        });
        

        // res.header('x-auth-token',token);
        // console.log(token);
        // res.redirect('/api/login');
        // res.redirect('/api/cements/');
        res.status(201).redirect('/api/cements/');   



});

//function for handling the error
function handleValidationError(err,body) {

    for(field in err.errors)
    {
        switch(err.errors[field].path){
           case 'userName': 
             body['userNameError'] = err.errors[field].message;
             break;
             case 'password': 
             body['passwordError'] = err.errors[field].message;
             break;
           case 'email': 
             body['emailError'] = err.errors[field].message;
             break; 
           case 'mobile':
               body['mobileError'] = err.errors[field].message     
        }
    }
}

module.exports = router;