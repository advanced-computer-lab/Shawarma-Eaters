const User = require('../models/user');

const findDepartureFlight = (req,res) => {
    if (cabinclass == "Economy" && number_of_Economy_seats >= adults + children){
        User.find({depAirport: req.body.depairport,arrAirport: req.body.arrAirport, dates: req.body.dates})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    if (cabinclass == "Business" && number_of_Business_class_seats >= adults + children){
        User.find({depAirport: req.body.depairport,arrAirport: req.body.arrAirport, dates: req.body.dates})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        //popup
    }
}
const findArrivalFlight = (req,res) => {
    if (cabinclass == "Economy" && number_of_Economy_seats >= adults + children){
        User.find({depAirport: to,arrAirport: from, dates: returnDate}) 
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    if (cabinclass == "Business" && number_of_Business_class_seats >= adults + children){
        User.find({depAirport: to,arrAirport: from, dates: returnDate})
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
