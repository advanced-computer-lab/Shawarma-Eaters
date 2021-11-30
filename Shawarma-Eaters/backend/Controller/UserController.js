const User = require('../models/user');

// changes needed
//
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
module.exports=
{
    getUserById,
    getAllUsers,
    updateUserById
}
