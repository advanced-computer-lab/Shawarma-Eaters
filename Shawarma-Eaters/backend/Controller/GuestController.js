const User = require('../models/user');
const Flight = require('../models/flight');
function parseDate(input) {

    let parts = input.split('-');
  
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
  }
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
        Flight.find({depAirport: req.body.departureAirport,arrAirport: req.body.arrivalAirport, dates: Date.parse(req.body.departureDate), number_of_Business_class_seats :{ $gte: Number(req.body.adults) + Number(req.body.children)}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        console.log("I'm in else")
        Flight.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
}
const findArrivalFlight = (req,res) => {
    if (req.body.cabinclass == "Economy" ){
        Flight.find({depAirport: req.body.arrivalAirport,arrAirport: req.body.departureAirport, dates: Date.parse(req.body.arrivalDate), number_of_Economy_seats :{ $gte:Number(req.body.adults) + Number(req.body.children)}}) 
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (req.body.cabinclass == "Business" ){
        Flight.find({depAirport: req.body.arrivalAirport,arrAirport: req.body.departureAirport, dates: Date.parse(req.body.arrivalDate), number_of_Business_class_seats :{ $gte: Number(req.body.adults) + Number(req.body.children)}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        //popup
    }
  
}
//
const createUser = (req,res) => {
    console.log('trying to create user');
    
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;   
    const passportnumber = req.body.passportnumber;
    const password = req.body.password;

    const newUser = new User({
        username,
        firstname,
        lastname,
        email,
        passportnumber,
        password
    });
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  };

const getAllUsers = (req,res) => {
    console.log('ALL aboard');
    console.log(req.body); 
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
}
// const getAdmin = (req,res) => {
//     Admin.find({$and:[{username : req.body.username},{password : req.body.password}]})
//     .then(Admins => {res.json(Admins); console.log('Success')})
//     .catch(err => res.status(400).json('Error: ' + err));
// }
module.exports=
{
    createUser,
    getAllUsers,
    findDepartureFlight,
    findArrivalFlight
    // addAdmin,
    // getAdmin
}
//