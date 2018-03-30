//requiring uuid package for generating unique fine id
const uuid = require('uuid/v1');

/*
This class will contain every fine related operations
operation like add fine, search for a fine, change fine status to paid etc
 */
class FineManager{

    //connection parameter : mysql connection object
    constructor(connection){
        //assigning connection object to a variable
        this.connection = connection;
        //logging out about creation of file manager
        console.info('File manager object is created')
    }

    //this function will add/assign fine to any specific vehicle
     addFine(vehicleNo, amount, description, officerId, callback){

        //generating unique Fine id
        const FineId = uuid();

        //sql query for adding fine
        const ADD_FINE_SQL = `INSERT INTO fine(FineID, vehicleNumber, amount, description, officerID) VALUES ('${FineId}', '${vehicleNo}', '${amount}', '${description}', '${officerId}')`;

        //executing ADD_FINE_SQL query
        this.connection.query(ADD_FINE_SQL, (err)=>{

            //checking for error
            if(err){
                //printing about error in console
                console.log(err)
                console.error('error executing ADD FINE SQL query');
                callback(false);
            }else{
                //printing in console about new entry add
                console.info('fine added in database');
                callback(true);
            }
        });
    };

    //this function will give you list of fine on particular vehicle
    /*
        parameter
        vehicleNo: vehicle no who's fine list is to be found
        callback: callback function which will be called with result as its parameter/argument
     */
    getFines(vehicleNo, callback){

        //sql query for extracting fines on particular vehicle
        const GET_FINES_SQL = `SELECT * from fine where vehicleNumber = '${vehicleNo}'`;

        //executing sql query
        this.connection.query(GET_FINES_SQL, (err, result)=>{

            //checking for error
            if(err){
                //printing on console about error
                console.error('error: ERROR executing get fine sql query');
                return false;
            }

            //checking for blank result
            if(!result||result===''){
                //printing on console about blank result
                console.info('blank result obtain');
                return false;
            }

            //giving result to callback function
            callback(result);
            return true;
        })
    };

    //this function will give you fine
    /*
        parameter
        Fine id: id of fine
        callback: callback function which will be called with result as its parameter/argument
     */
    getFine(FineId, callback){

        //sql query for extracting fine using fine ID
        const GET_FINE_SQL = `SELECT * from fine where FineID = '${FineId}'`;

        //executing sql query
        this.connection.query(GET_FINE_SQL, (err, result)=>{

            //checking for error
            if(err){
                //printing on console about error
                console.error('error: ERROR executing get fine sql query');
                return false;
            }

            //checking for blank result
            if(!result||result===''){
                //printing on console about blank result
                console.info('blank result obtain');
                return false;
            }

            //giving result to callback function
            callback(result);
            return true;
        })
    };

    //this function will change fine status to paid
    //param:
    //FineId: FineId which is to change to paid
    changeFineToPaid(fineId){

        //sql query for changing fine status to paid
        const SET_FINE_TO_PAID_SQL = `UPDATE FINE set paid = 1 WHERE FineID = '${fineId}`;

        //executing sql query
        this.connection.query(SET_FINE_TO_PAID_SQL, (err)=>{

            //checking for error
            if(err){
                //printing in console about failed query
                console.error('ERROR: set fine to paid sql query failed');
                return false;
            }

            //else console logging changed fine status to
            console.log(`status of fine id: ${fineId} changed to paid`);
            return true;
        })
    };
}

//this variable will store Fine manager object and will be exported so that other modules can access it
let fineManager = null;

//exported function which is exported ..when called will create an Fine Manager object and store it in exported
//variable fine Manager
//connection argument is basically mysql connection object
module.exports.FineManagerCreator = (connection)=>{
    return new FineManager(connection);
};

//exporting fineManager variable
module.exports.fineManager = fineManager;
