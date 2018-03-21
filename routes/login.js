const express = require('express');
const router = express.Router();

//requiring authentication module
const AuthenticationModule = require('../project_modules/Authentication');

// listening for post request
//username =uname
//password = psw
router.post('/', (req, res)=>{

    //extracting  authenticator object
    const authenticator = AuthenticationModule.authenticationObject;

    //extracting user enter username and password
    const username = req.body.uname;
    const password = req.body.psw;

    //checking if username and password is passed
    if(!username || !password){
        console.error('error: invalid login request');
        res.send('invalid request');
        return false;
    }

    //verifying username and password and giving appropriate reply password
    authenticator.verifyUserPassword(username, password, (result)=>{
        if(result) {
            //setting up session
            let userSession = req.session;
            userSession.uname = username;
            console.log(userSession.uname);
            res.send('true');
        }
        else {
            res.send('false');
        }
    });

});

//exporting router
module.exports = router;