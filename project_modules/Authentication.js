//package to hash password
const passwordHash = require('password-hash');

/*
    This class will handle authentication related database action 
    it is required to pass connection object it constructor to
    use it

*/
class Authentication {

    //connection parameter : mysql connection object
    constructor(connection) {
        //assigning connection object to a variable
        this.connection = connection;
        //logging out about connection object
        console.log('authenticator is now active');
    }

    //this method will add user to our database(authorities only)
    //username : username of user(traffic person)
    //password : password of user
    //return : true is operation completed | in case of error return false
    registerUser(username, password) {

        //checking if username and password is passed
        if (!username || !password) {
            //username password not passed
            console.log('username or password not passed');
            return false;
        }

        //hashing password passed by admin 
        const hashedPassword = passwordHash.generate(password);

        //sql query for adding user
        const ADD_USER = `Insert into authentication(username, password) 
                                values ('${username}', '${hashedPassword}')`;

        //executing query
        this.connection.query(ADD_USER, (err) => {
            //checking for error
            if(err) {
                //console logging error
                console.log('error: error while executing addUser');
                return false;
            }

            //returning true as query executed successfully
            return true;
        }
    )

    }

    //this method will verify user password
    //3 required parameter
    //username: user name of user(authorized)
    //password: password of user
    //callback function: after checking method will call this function and pass result as parameter(true/false)
    verifyUserPassword(username, unverfiedPassword, callback) {

        //checking for parameter related error
        if (!username, !unverfiedPassword, !callback) {
            //logging out error
            console.log('error invalid parameter passed in verify user passsword');
            return false;
        }

        //sql query for getting password for user whose password is to be checked
        const GET_USER_PASSWORD_SQL = `select password from authentication where username='${username}'`;

        //executing query
        this.connection.query(GET_USER_PASSWORD_SQL, (err, verifiedPassword) =>{

            //checking for error 
            if(err) {
                //logging out about error, passing result in callback and terminating process
                console.log('error: error while executing GET_USER_PASSWORD_SQL');
                callback(false);
                return false;
            }

            //checking validity of result or error in result
            if(!verifiedPassword, verifiedPassword.length === 0){
            //logging out problem, passing result in callback and terminating process
            console.log('no result found/blank result');
            callback(false);
            return false;
        }

        //checking unverfied password and storing result in result variable
        const result = passwordHash.verify(unverfiedPassword, verifiedPassword);

        //passing result to callback function
        callback(result);

    })
    }
}

//variable that contain authentication object that we are exporting
let authenticationObject = null;
/*
    exporting necessary functions and variable
 */
module.exports.authenticationObjectCreator = (connection)=>{
    authenticationObject = new Authentication(connection)
};

module.exports.authenticationObject = authenticationObject;