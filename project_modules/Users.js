const nodemailer = require('nodemailer');
const emailTransporter = require('../helper/emailCredentials');

/*
This class contain function related to vehicle no like notification and fetching vehicle no info etc
 */
class Users{

    //parameter:
    //connection: mysql connection object
     constructor(connection){
         //setting connection to class member
         this.databaseConnection = connection;
         console.log('User class is now active');
     }

     //fetch user details using vehicle no
    // vehicle no: vehicle no to find
    // callback: function to be called after query executed successfully
    //this function will pass result in callback parameter
     fetchDetails(vehicleNo, callback){

         //sql query which will extract details using  vehicle no
         const GET_DETAILS_SQL = `SELECT * FROM dummy WHERE vehicleNumber='${vehicleNo.toUpperCase()}'`;

         this.databaseConnection.query(GET_DETAILS_SQL, (err, result)=>{

             //checking for faulty result
             if(!result || result.length === 0 || err){
                 callback(false);
                 return false;
             }

             //passing on result to callback
             callback(result);
         });
     }

     notifyEmailUser(email, vehicleNo, description, amount, name){

         const transporter = emailTransporter.transporter;

         const mailOptions = {
             from: 'itrack2k18@gmail.com',
             to: email,
             subject: 'regarding your e-challan',
             text: `
                Dear ${name},
                    You have issued a e-challan for ${description} on of rs ${amount} on ${'30/3/2018'}. To proceed with your e-challan visit:  
                    http://localhost:3000/userboard?vehicleNo=${vehicleNo} 
                    details: 
                    
                    name: ${name}
                    
                    vehicle no: ${vehicleNo}
                    
                    description: ${description}
                    
                    amount: ${amount}                   
                    
                    In case of queries please mail us on: iTrack2k18@gmail.com                    
                    Regards,
                    iTrack Team
             `
         };

         transporter.sendMail(mailOptions, function(error, info){
             if (error) {
                 console.log(error);
             } else {
                 console.log('Email sent: ' + info.response);
             }
         });
     }
}

module.exports.userObjectCreator = (connection)=>{
    return new Users(connection);
};

module.exports.userManager = null;
