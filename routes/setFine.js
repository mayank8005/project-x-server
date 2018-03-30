const express = require('express');
const router = express.Router();

//requiring fine manager module
const fineManagerModule = require('../project_modules/FineManager');

router.post('/', (req, res)=>{

    //extracting Fine manager object
    const fineManager = fineManagerModule.fineManager;

    //extracting username in session
    uname = req.session.uname;

    //extracting post variable
    const vehicleNo = req.body.vehicleNo;
    const description = req.body.description;
    const amount = req.body.amount;

    //checking for session variable and fine manager object for error
    if(!fineManager || !uname){

        //print in console about error
        console.error('error: fine manager object or uname variable not found');
        res.status(403).send("You do not have rights to visit this page");
        return false;
    }

    //checking if post variable exist or not
    if(!vehicleNo || !description || !amount){

        //printing in console about the state
        console.error('error: invalid post request in setFine');
        res.status(400).send('invalid request');
        return false;
    }

    fineManager.addFine(vehicleNo, amount, description, uname, (result)=>{
       if(result){
           res.status(200).send('success');
       }else{
           res.status(500).send('server or database error');
       }
    });
});

//exporting router
module.exports = router;