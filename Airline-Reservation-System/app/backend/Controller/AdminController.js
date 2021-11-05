const { model } = require('mongoose');
const Admin = require('../models/admin');

const addAdmin =  (req,res)=> {

console.log('request came');
console.log(req.body);
const admin =new Admin(
    {
        username : req.body.password,
        password : req.body.password
    }
);
admin.save()
.then(() => res.json('User added!'))
.catch(err => res.status(400).json('Error: ' + err));
};

module.exports
{
    addAdmin
}