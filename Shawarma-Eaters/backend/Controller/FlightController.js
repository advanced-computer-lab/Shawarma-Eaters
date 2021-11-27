const Flight = require('../models/flight');

const addFlight =  (req,res)=> {

    const flight_number = req.body.flight_number;
    const departure = req.body.departure;
    const arrival_times = req.body.arrival_times;
    const number_of_Economy_seats = Number(req.body.number_of_Economy_seats);
    const number_of_Business_class_seats = Number(req.body.number_of_Business_class_seats);
    const airport = req.body.airport;
    const dates = Date.parse(req.body.dates);
  
  
    const newFlight = new Flight({
      flight_number,
      departure,
      arrival_times,
      number_of_Economy_seats,
      number_of_Business_class_seats,
      airport,
      dates
    });
  
    newFlight.save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  };

// const flight =new Flight(
//     {
//         flightNumber : req.body.username,
//         departureDateTime : req.body.username,
//         arrivalDateTime : req.body.username,
//         economySeats : req.body.username,
//         businessSeats : req.body.username,
//         airPort : req.body.username,
//         origin : req.body.username,
//         destination : req.body.username
//     }
// );
// flight.save()
// .then(() => res.json('Flight added!'))
// .catch(err => res.status(201).json(post)
// );


const getAllFlights = (req,res) => {
    console.log('request came');
    console.log(req.body); 
    Flight.find()
    .then(Flights => res.json(Flights))
    .catch(err => res.status(400).json('Error: ' + err));
}
const getFlightTable =  (req, res) => {
    Flight.find({})
        .then(result => { res.send(result); })
        .catch(err => {console.log(err); });
}

const getFlightById = (req, res) => {
    Flight.findById(req.params.id)
      .then(flight => res.json(flight))
      .catch(err => res.status(400).json('Error: ' + err));
}
const deleteFlightById = (req, res) => {
    Flight.findByIdAndDelete(req.params.id)
      .then(() => res.json('Flight deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}
const deleteFlightById2 = (req, res) => {
    Flight.findByIdAndDelete(req.params.id)
      .then(() => res.json('Flight deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}
const updateFlightById = (req, res) => {
    Flight.findById(req.params.id)
        .then((flight) => {


      flight.flight_number = req.body.flight_number;
      flight.departure = req.body.departure;
      flight.arrival_times = req.body.arrival_times;
      flight.number_of_Economy_seats = Number(req.body.number_of_Economy_seats);
      flight.number_of_Business_class_seats = Number(req.body.number_of_Business_class_seats);
      flight.airport = req.body.airport;
      flight.dates = Date.parse(req.body.dates);

      flight.save()
      .then(() => res.json('Flight+ updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
}
module.exports=
{
    getAllFlights,
    addFlight,
    getFlightTable,
    getFlightById,
    deleteFlightById,
    deleteFlightById2,
    updateFlightById
}