const User = require('../models/user');

// changes needed
// add popup in case of choosing other than economy and business
const addAdmin =  (req,res)=> {

    console.log('request came');
    console.log(req.body);
    const admin =new Admin(
        {
            username : req.body.username,
            password : req.body.password
        }
    );
    admin.save()
    .then(() => res.json('Admin added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    };
    
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

        //popup
    }
  
}
const getUserById = (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
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

 

module.exports=
{
    findDepartureFlight,
    findArrivalFlight,
    getAdmin,
    getUserById,
    getAllUsers,
    getAllAdmins,
    updateUserById,
    deleteUserById,
    addAdmin
}