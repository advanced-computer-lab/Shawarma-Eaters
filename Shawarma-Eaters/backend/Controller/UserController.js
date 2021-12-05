const User = require('../models/user');
const nodemailer = require('nodemailer');


<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> origin/Sprint-2-person-1

// changes needed
// add popup in case of choosing other than economy and business
const findDepartureFlight = (req,res) => {

<<<<<<< HEAD
=======
>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1
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
<<<<<<< HEAD
    console.log('No departure found');

=======
<<<<<<< HEAD
    console.log('No departure found');

=======
>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1
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
<<<<<<< HEAD
        console.log('No arrival found');

=======
<<<<<<< HEAD
        console.log('No arrival found');

=======
>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1
        //popup
    }
  
}
const getUserById = (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> origin/Sprint-2-person-1
const getUserBookingById = (req, res) => {
    User.findById(req.params.id).populate({path : 'bookings',populate :[{path : 'outgoingFlightId'},{path : 'returnFlightId'}]})//.populate('outgoingFlightId').populate('returnFlightId')
      .then(user => res.json(user.bookings))
      .catch(err => res.status(400).json('Error: ' + err));
}

<<<<<<< HEAD
=======
>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
}

 

=======
>>>>>>> origin/Sprint-2-person-1
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
        text: `Hello,${userDetails.firstname} ${userDetails.lastname} you have been canceled your reservation and the refunded amount is `,
       
        
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

<<<<<<< HEAD
=======
>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1
module.exports=
{
    findDepartureFlight,
    findArrivalFlight,
    getUserById,
    getAllUsers,
    updateUserById,
<<<<<<< HEAD
=======
<<<<<<< HEAD
    deleteUserById
}
=======
>>>>>>> origin/Sprint-2-person-1
    deleteUserById,
    sendEmail,
    getUserBookingById,
    deleteUserBookById
}

<<<<<<< HEAD
=======
>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1
