const express = require('express');
const router = express.Router();

//requiring fine module
const FineManagerModule = require('../project_modules/FineManager');

/* GET users listing. */
router.get('/', function(req, res, next) {

    //extracting fine manager object
    const fineManager = FineManagerModule.fineManager;

    //extracting vehicle no to search
    const searchString = req.query.vehicleNo;

    //if search string not present redirecting user to home page
    if(!searchString){

        //print in console about this condition
        console.info('search string not present redirecting to home page');

        res.redirect('/');
        return false;
    }

    //getting user fine details
    fineManager.getFines(searchString, (result)=>{
        console.log(result[0]);
        res.render('userboard', {fines: result});
    });
});

module.exports = router;