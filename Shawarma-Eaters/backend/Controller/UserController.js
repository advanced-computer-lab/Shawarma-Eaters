const User = require('../models/user');

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
    var transporter = nodemailer.createTransport("SMTP",{
        
        service: "Gmail",
        auth: {
        user: 'anasayman5@gmail.com',
        pass: 'anas200000000000'
        }
    });

    var mailOptions = {
        from: '"ACL PROJECT TEST" <anasayman5@gmail.com>',// sender address
        to: 'saraayman5@gmail.com', // list of receivers
        subject: 'ACL PROJECT TEST', // Subject line
        text:'HELLO WORLD,ACL PROJECT TEST',
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.to}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.description}</li>
        </ul>
        `
    };
    
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
    sendEmail
}
module.exports=
{
    getAllAdmins,
    addAdmin,
    getAdmin
}
