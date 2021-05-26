const express = require('express');
const { date } = require('joi');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const {Cement,validateCement,cementSchema} = require('../models/cement');
const router = express.Router();

router.get('/',auth, (req,res)=>{
    res.render('cement/addOrEdit',{
        viewTitle: 'Insert Details of Ambuja'
    });
});

router.get('/list', async(req,res)=>{
    const cements = await Cement.find()
    res.render('cement/list',{
        list:cements
    });
});

router.post('/',(req,res)=>{

    const cement = new Cement({
        date : req.body.date,
        qty : req.body.qty,
        rate: req.body.rate,
        total: req.body.total
    });
    cement.save((err,doc)=>{
        if(!err) 
          res.redirect('/api/cements/list');
       else{
           if(err.name=='ValidationError'){
           handleValidationError(err,req.body);
             res.render('cement/addOrEdit',{
               viewTitle : 'Insert Cement',
               cement: req.body
           });
           }
    else console.log('Error during record insertion :' + err);
   }
   });
});

router.get('/:id', auth , async (req,res)=>{
    await Cement.findOneAndUpdate(req.params.id,req.body,{new:true},(err,doc)=>{
        if(err) {res.redirect('/api/cements/list');}
        else{
                res.render('cement/addOrEdit',{
                    viewTitle:'Update Cement',
                    cement : req.body
                });
            
        }
    })

 }); 
     


router.get('/delete/:id',auth, async(req, res)=>{
    await Cement.findByIdAndRemove(req.params.id);
    console.log(`Entry ${req.params.id} deleted successfully`);
    res.redirect("/api/cements/list")
});



function handleValidationError(err,body) {

    for(field in err.errors)
    {
        switch(err.errors[field].path){
           case 'date': 
             body['dateError'] = err.errors[field].message;
             break;
           case 'qty': 
             body['qtyError'] = err.errors[field].message;
             break; 
           case 'rate':
               body['rateError'] = err.errors[field].message
           case 'total':
               body['totalError'] = err.errors[field].message
           default :
             break;     
        }
    }
}

module.exports =router