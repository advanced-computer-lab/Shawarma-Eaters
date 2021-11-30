const User = require('../models/user');
const nodemailer = require('nodemailer');

// changes needed

const getAllAdmins = (req,res) => {
    console.log('request came GetALL');
    console.log(req.body); 
    Admin.find()
    .then(Admins => res.json(Admins))
    .catch(err => res.status(400).json('Error: ' + err));
}
const getAdmin = (req,res) => {
    Admin.find({$and:[{username : req.body.username},{password : req.body.password}]})
    .then(Admins => {res.json(Admins); console.log('Success')})
    .catch(err => res.status(400).json('Error: ' + err));
}
const sendEmail = (req,res) => {
    console.log('email request came');
    console.log(req.body);
   
   
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL || 'acluser40@gmail.com', // TODO: your gmail account
            pass: process.env.PASSWORD || 'aclgroup123' // TODO: your gmail password
        }
    });
//<li>Email: ${req.body.to}</li>
    let mailOptions = {
        from: 'acluser40@gmail.com', // TODO: email sender
        to: 'anasayman5@gmail.com', // TODO: email receiver
        subject: 'Nodemailer - Test2',
        text: 'Wooohooo it works!!',
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: acluser40@gmail.com</li>   
            <li>Subject: 'Nodemailer - Test2'</li>
            <li>Message: 'Wooohooo it works!!'</li>
        </ul>
        `
        
    };
    // const log = console.log;
    // transporter.sendMail(mailOptions, (err, data) => {
    //     if (err) {
    //         return log('Error occurs');
    //     }
    //     return log('Email sent!!!');
    // });
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
        res.json({status: true, respMesg: 'Email Sent Successfully'})
           return console.log('there an error')
        } 
        else
        {
        res.json({status: true, respMesg: 'Email Sent Successfully'})
        console.log('Email Sent Successfully')
        }
    
    });
}

module.exports=
{
    getAllAdmins,
    getAdmin,
    sendEmail
}
