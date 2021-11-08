const router = require('express').Router();
let Flight = require('../models/flight.model');

router.route('/').get((req, res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/flighttable').get((req, res) => {
  Flight.find({})
      .then(result => { res.send(result); })
      .catch(err => {console.log(err); });
    });

router.route('/add').post((req, res) => {
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
});

router.route('/:id').get((req, res) => {
  Flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Flight.findByIdAndDelete(req.params.id)
    .then(() => res.json('Flight deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').get((req, res) => {
  Flight.findByIdAndDelete(req.params.id)
    .then(() => res.json('Flight deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
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
});

module.exports = router;