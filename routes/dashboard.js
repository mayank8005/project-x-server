const express = require('express');
const router = express.Router();

//requiring 
/* GET dashboard. */
router.get('/', function(req, res, next) {

    //checking if username is present in session
    uname = req.session.uname;

    //if username not present redirecting to home page
    if(!uname) {
        //redirecting to home page
        res.redirect('/index');

        //console logging about error
        console.info('directly accessing dashboard page....login first');
        return false;
    }
    //else rendering dashboard
    res.render('dashboard', {uname: uname, IPCData: });
});

module.exports = router;
