const nodemailer = require('nodemailer');
const  smtpPool = require('nodemailer-smtp-pool');


module.exports.transporter = nodemailer.createTransport(smtpPool({
    service: 'gmail',
    auth: {
        user: 'itrackteam2k18',
        pass: 'itrack1234'
},
maxConnections: 5,
    maxMessages: 10
}));