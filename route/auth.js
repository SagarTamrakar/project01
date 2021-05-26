const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');   //hashing the password
const mongoose = require('mongoose');    
const { User } = require('../models/user');
const { user } = require('./Users');

router.get('/', (req,res)=>{
    res.render('home/signin',{        
    viewTitle: 'Enter Log in credential'
    });
});
router.post('/', async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Invalid Email and Password');
    const isValid = await bcrypt.compare(req.body.password,user.password)
    if (!isValid) return res.status(400).send('Invalid Email or password');

    const token = user.generateAuthenticationToken();
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+60000)
    });
    
    // await res.header('x-auth-token',token).send(user);
    // await user.save();
     res.redirect('/api/cements');
    console.log(token);
});

module.exports = router;