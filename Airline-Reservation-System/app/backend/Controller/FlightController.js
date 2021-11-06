const Flight = require('../models/flight');

const addFlight =  (req,res)=> {

console.log('request came');
console.log(req.body);
const flight =new Flight(
    {
        flightNumber : req.body.username,
        departureDateTime : req.body.username,
        arrivalDateTime : req.body.username,
        economySeats : req.body.username,
        businessSeats : req.body.username,
        airPort : req.body.username,
        origin : req.body.username,
        destination : req.body.username
    }
);
flight.save()
.then(() => res.json('Flight added!'))
.catch(err => res.status(201).json(post)
);
};

const getAllFlights = (req,res) => {
    console.log('request came');
    console.log(req.body); 
    Flight.find()
    .then(Flights => res.json(Flights))
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports=
{
    getAllFlights,
    addFlight
}