const User = require('../models/user');

const findDepartureFlight = (req,res) => {
    if (req.body.cabinclass == "Economy" ){
        User.find({depAirport: req.body.departureAirport,arrAirport: req.body.arrivalAirport, dates: req.body.depratureDate, number_of_Economy_seats :{ $gte: req.body.adults + req.body.children}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (req.body.cabinclass == "Business" ){
        User.find({depAirport: req.body.departureAirport,arrAirport: req.body.arrivalAirport, dates: req.body.depratureDate, number_of_Business_class_seats :{ $gte: req.body.adults + req.body.children}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    
}
const findArrivalFlight = (req,res) => {
    if (req.body.cabinclass == "Economy" ){
        User.find({depAirport: req.body.arrivalAirport,arrAirport: req.body.departureAirport, dates: req.body.arrivalDate, number_of_Economy_seats :{ $gte: req.body.adults + req.body.children}}) 
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (req.body.cabinclass == "Business" ){
        User.find({depAirport: req.body.arrivalAirport,arrAirport: req.body.departureAirport, dates: req.body.arrivalDate, number_of_Business_class_seats :{ $gte: req.body.adults + req.body.children}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        //popup
    }
  
}
//
const createUser = (req,res) => {
    console.log('trying to create usr');
    
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
    console.log('ALL abord');
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
