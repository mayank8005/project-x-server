const express = require('express');
const router = express.Router();

//requiring fine module
const FineManagerModule = require('../project_modules/FineManager');

/* GET users listing. */
router.get('/', function(req, res, next) {

    //extracting fine manager object
    const fineManager = FineManagerModule.fineManager;

    //extracting FineID to search
    const FineID = req.query.id;

    //if  not present redirecting user to home page
    if(!FineID){

        //print in console about this condition
        console.info('search string not present redirecting to home page');

        res.redirect('/');
        return false;
    }

    //getting user fine details
    fineManager.getFine(FineID, (result)=>{

        //if Fine id does not exist
        if(!result || result.length===0){
            console.info('Fine not found');
            res.status(404).send(' Fine not Found');
            return ;
        }

        res.render('fine', {FineID: result[0].FineID,
                            vehicleNo: result[0].vehicleNumber,
                            amount: result[0].amount,
                            officerID: result[0].officerID,
                            description: result[0].description,
                            paid: result[0].paid
                });
    });
});

module.exports = router;