const express = require('express');
const router = express.Router();

//requiring user module
const userModule = require('../project_modules/Users');

router.post('/', (req, res)=>{

    //extracting user manager object
    const userManager = userModule.userManager ;

    //extracting username in session
    const uname = req.session.uname;

    //extracting post variable
    const vehicleNo = req.body.vehicleNo;

    //checking for session variable and fine manager object for error
    if(!userManager || !uname){

        //print in console about error
        console.error('error: user manager object or uname variable not found');
        res.status(403).send("You do not have rights to visit this page");
        return false;
    }

    //checking if post variable exist or not
    if(!vehicleNo){

        //printing in console about the state
        console.error('error: invalid post request in fetchVehicle');
        res.status(400).send('invalid request');
        return false;
    }

    userManager.fetchDetails(vehicleNo, (result)=>{
        console.log(result);
        if(result){
            console.log(result);
            res.status(200).send(result);
        }else{
            res.status(200).send([]);
        }
    });
});

//exporting router
module.exports = router;