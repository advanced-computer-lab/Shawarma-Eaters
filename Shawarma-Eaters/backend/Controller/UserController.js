const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { default: Axios } = require('axios');


// changes needed
// add popup in case of choosing other than economy and business
const findDepartureFlight = (req,res) => {


    let depdate = new Date(req.body.departureDate);
    let depdateUpper = depdate.setHours(23,59,59,999);
    let depdateLower = depdate.setHours(0,0,0,0) ;
 if (req.body.cabinclass == "Economy" ){
     console.log(depdate);
     Flight.find({depAirport: req.body.departureAirport,arrAirport: req.body.arrivalAirport,dates:{$lt: new Date(depdateUpper),$gt: new Date(depdateLower)},  number_of_Economy_seats :{ $gte: Number(req.body.adults) + Number(req.body.children)}})
     .then((flight) =>res.json(flight))
     .catch(err => res.status(400).json('Error: ' + err));
 }
 else if (req.body.cabinclass == "Business" ){
     Flight.find({depAirport: req.body.departureAirport,arrAirport: req.body.arrivalAirport,dates:{$lt: new Date(depdateUpper),$gt: new Date(depdateLower)}, number_of_Business_class_seats :{ $gte: Number(req.body.adults) + Number(req.body.children)}})
     .then(flight => res.json(flight))
     .catch(err => res.status(400).json('Error: ' + err));
 }
 else{
    console.log('No departure found');

    console.log('No departure found');


     //POPUP
 }
}
const findArrivalFlight = (req,res) => {
    let arrdate = new Date(req.body.arrivalDate);
    let arrdateUpper = arrdate.setHours(23,59,59,999);
    let arrdateLower = arrdate.setHours(0,0,0,0) ;
    if (req.body.cabinclass == "Economy" ){
        Flight.find({depAirport: req.body.arrivalAirport,arrAirport: req.body.departureAirport, dates:{$lt: new Date(arrdateUpper),$gt: new Date(arrdateLower)}, number_of_Economy_seats :{ $gte:Number(req.body.adults) + Number(req.body.children)}}) 
        .then(flight => res.json(flight))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (req.body.cabinclass == "Business" ){
        Flight.find({depAirport: req.body.arrivalAirport,arrAirport: req.body.departureAirport, dates:{$lt: new Date(arrdateUpper),$gt: new Date(arrdateLower)}, number_of_Business_class_seats :{ $gte: Number(req.body.adults) + Number(req.body.children)}})
        .then(flight => res.json(flight))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        console.log('No arrival found');

        console.log('No arrival found');

        //popup
    }
  
}
const getUserById = (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
}

const getUserBookingById = (req, res) => {
    User.findById(req.params.id).populate({path : 'bookings',populate :[{path : 'outgoingFlightId'},{path : 'returnFlightId'}]})//.populate('outgoingFlightId').populate('returnFlightId')
      .then(user => res.json(user.bookings))
      .catch(err => res.status(400).json('Error: ' + err));
}

const getAllUsers = (req,res) => {
    console.log('request came Get ALL');
    console.log(req.body); 
    User.find()
    .then(Users => res.json(Users))
    .catch(err => res.status(400).json('Error: ' + err));
}
const updateUserById = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {

      user.username = req.body.username;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.passportnumber = req.body.passportnumber;
      user.password = req.body.password;

      user.save()
      .then(() => res.json('User+ updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
}
const deleteUserById = (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}

const deleteUserBookById = (req, res) => {
    console.log('deleteUserBookById is been requested' ); 
    User.updateMany({ _id: req.params.id}, {$pull: { bookings :req.params.book}})  //delete the booking from the array of bookings in user properties
      .then(() => res.json('Book deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}

const sendEmail = async (req,res) => {
    var email = 'unKown';
    var userDetails = {_id: "1",
    username: 'unkown',
    firstname: 'unkown',
    lastname: 'unkown',
    email: 'unkown',
    passportnumber: 'unkown',
    password: 'unkown',
    };
   // res.json({status: true, respMesg: 'AAAAEmail Sent Successfully'})
    await User.findById(req.params.id)
          .then((user) => {email = user.email;userDetails = user})
          .catch(err => res.status(400).json('Error: ' + err));
    console.log(email)
    console.log(userDetails)

    console.log('email request came');
    //console.log(req.body);
    
   
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
        to: email, // TODO: email receiver
        subject: 'Nodemailer - Test2',
        text: `Hello,${userDetails.firstname} ${userDetails.lastname} you have been canceled your reservation and the refunded amount is $499 `,
        html: ""
       
        
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
            res.json({status: true, respMesg: "Email Didn't Sent Successfully"})
           return console.log('there an error', error)
        } 
        else
        {
        res.json({status: true, respMesg: 'Email Sent Successfully'})
        console.log('Email Sent Successfully')
        }   
    
    });
}
let refreshTokens = []
// let accessTokens = []

const login = async (req, res, next) => {
console.log('in_login')
User.findOne({username : req.body.username}).then(async user =>  {
        if (user == null) 
        {
          console.log(req.body,req.body.name)
          return res.send('Wrong User')  //res.status(400).send('Cannot find user')
        }
        try {
            if(await bcrypt.compare(req.body.password, user.password)) {
                const username = req.body.username;
                const user = { name: username };
                const accessToken = generateAccessToken(user);
              //  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
              //  refreshTokens.push(refreshToken);
                // accessTokens.push(accessToken);
                res.json({ accessToken: accessToken,message :'success' })
                console.log({ accessToken: accessToken})
            } else {
              res.send('Wrong Password')
            }
            
          } catch {
            res.status(500).send()
          }
    })
  
 
   
    //   next();

}

const verifyAccess = async (req, res, next) => {
    //console.log('in in in ')

    const token = req.body.accessToken
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, user) => {
        //console.log(user.name)
        if (err) return res.sendStatus(403)

       await User.findOne({username : user.name}).then(user => res.json(user._id));
        //res.json(user.name);
      })

    }    

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

// Logout
const logout = (req, res) => {
    // req.logout();
    // req.flash('success_msg', 'You are logged out');
    // res.redirect('/users/login');
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    // accessTokens = accessTokens.filter(token => token !== req.body.token);


    res.sendStatus(204)
  }

 
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN)
  }
//   console.log('been in login backend');
//   passport.authenticate('local', {
//       successRedirect: 'http://localhost:3000/',
//       failureRedirect: 'http://localhost:3000/user/',
//       failureFlash: true
//     })(req, res, next); 

  



module.exports=
{
    verifyAccess,
    logout,
    login,
    findDepartureFlight,
    findArrivalFlight,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
    sendEmail,
    getUserBookingById,
    deleteUserBookById
}

