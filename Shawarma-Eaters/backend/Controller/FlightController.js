const Flight = require('../models/flight');

const addFlight =  (req,res)=> {

    const flight_number = req.body.flight_number;
    const departure = req.body.departure;
    const arrival_times = req.body.arrival_times;
    const number_of_Economy_seats = Number(req.body.number_of_Economy_seats);
    const number_of_Business_class_seats = Number(req.body.number_of_Business_class_seats);
    const economy_seats = [];
    const business_seats = [];
    for (let i = 0; i < number_of_Economy_seats; i++) {
      economy_seats.push(
        {seatnumber:(number_of_Business_class_seats+i+1).toString(),occupied:false}
      )
    }
    for (let i = 0; i < number_of_Business_class_seats; i++) {
      business_seats.push(
        {seatnumber:(i+1).toString(),occupied:false}
      )
    }
    
    const depAirport = (req.body.depAirport).trim();
    const arrAirport = (req.body.arrAirport).trim(  );
    const dates = Date.parse(req.body.dates);
  
  
    const newFlight = new Flight({
      flight_number,
      departure,
      arrival_times,
      number_of_Economy_seats,
      number_of_Business_class_seats,
      economy_seats,
      business_seats,
      depAirport,
      arrAirport,
      dates
    });
  
    newFlight.save()
    .then(() => res.json("DONE"))
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
//

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
    econseats =Number(req.body.number_of_Economy_seats);
    busiseats = Number(req.body.number_of_Business_class_seats);
    flight.number_of_Economy_seats = Number(req.body.number_of_Economy_seats);
    flight.economy_seats = [];
    economy_seats = [];
    flight.number_of_Business_class_seats = Number(req.body.number_of_Business_class_seats);
    flight.business_seats = [];
    for (let i = 1; i <= econseats; i++) {
      flight.economy_seats.push(
        {seatnumber:(busiseats+i).toString(),occupied:false}
      )
    }
    for (let i = 1; i <= busiseats; i++) {
      flight.business_seats.push(
        {seatnumber:(i).toString(),occupied:false}
      )
    }
    flight.depAirport = req.body.depAirport;
    flight.arrAirport = req.body.arrAirport;
    flight.dates = Date.parse(req.body.dates);

    flight.save()
    .then(() => console.log("Done"))
    .catch(err => res.status(400).json('Error: ' + err));
})
.catch(err => res.status(400).json('Error: ' + err));
}
const UpdateFlightSeat = (req, res) => {
  console.log('Seat Update' ); 
  User.updateMany({ _id: req.params.id , economy_seats : req.params.economy_seats}, {$set: { economy_seats :{occupied:false}}})
    .then(() => res.json('Seat Update in UpdateFlightSeat'))
    .catch(err => res.status(400).json('Error: ' + err));
}

const SeatStateBusiness = (req, res) => {
  console.log("inside seat stateBusiness,,,flyNo input: "+req.params.flyNo);
  occupied = ((req.params.occupied).toLowerCase() === 'true'); 
  Flight.findOneAndUpdate(
    {"flight_number":req.params.flyNo,"business_seats.seatnumber":req.params.seatNo},
    {$set:{'business_seats.$.occupied': req.params.occupied }})
    .then(() => res.json('Seat Update in SeatState,,,,Seat no: '+ req.params.seatNo + 'occupied state: '+ req.params.occupied))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  const SeatStateEconomy = (req, res) => {
    console.log("inside seat stateEcomomy,,,flyNo input: "+req.params.flyNo);
    occupied = ((req.params.occupied).toLowerCase() === 'true'); 
    Flight.findOneAndUpdate(
      {"flight_number":req.params.flyNo,"economy_seats.seatnumber":req.params.seatNo},
      {$set:{'economy_seats.$.occupied': req.params.occupied }})
      .then(() => res.json('Seat Update in SeatState,,,,Seat no: '+ req.params.seatNo + 'occupied state: '+ req.params.occupied))
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
    updateFlightById,
    UpdateFlightSeat,
    SeatStateBusiness,
    SeatStateEconomy
}