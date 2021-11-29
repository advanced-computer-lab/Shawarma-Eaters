const User = require('../models/user');

const findDepartureFlight = (req,res) => {
User.find({From, To, DepartureDate,Adults, Children, cabinclass})
}
const findArrivalFlight = (req,res) => {
    User.find({To, From , ReturnDate, Adults, Children, cabinclass})
}

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
    getAllUsers
    // addAdmin,
    // getAdmin
}
