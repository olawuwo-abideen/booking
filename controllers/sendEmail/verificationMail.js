const nodeMailer = require('nodemailer');
const fs = require('fs');
const handlebar = require('handlebars');
require('dotenv').config();


const transporter = nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const initiateMailsending = (recipientMail,link,otp=null) => {
    fs.readFile(__dirname+'/templates/verification.html', "utf8", (error, data) => {
        if (error) throw error;
        let template = handlebar.compile(data);
        const replacement = {
            link:link,
            OTP:otp
        };
        template = template(replacement);
        transporter.sendMail({
            to:recipientMail,
            subject: "Email verification",
            html:template
        }, (err,info) => {
            if(err) throw err;
            console.log(info.response);
        })
    })
} 

module.exports = initiateMailsending;
// iniateMailsending('abideenolawuwo2000@gmail.com','www.google.com');