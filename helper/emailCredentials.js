const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'itrack2k18@gmail.com',
        pass: 'itrack1234'
    }
});