const flightController = require('../Controller/FlightController');
const router = require('express').Router();


router.route('/').get(flightController.getAllFlights);
router.route('/flighttable').get(flightController.getFlightTable);
router.route('/:id').get(flightController.getFlightById);
router.route('/delete/:id').get(flightController.deleteFlightById2);

router.route('/add').post(flightController.addFlight);
router.route('/update/:id').post(flightController.updateFlightById);
router.route('/seat/:flyNo/:seatNo/:occupied').get(flightController.SeatState);

router.route('/:id').delete(flightController.deleteFlightById);


module.exports = router;  
//
