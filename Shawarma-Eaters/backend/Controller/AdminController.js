const Admin = require('../models/admin');

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
    getAllAdmins,
    addAdmin,
    getAdmin
}
