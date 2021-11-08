const flightController = require('../Controller/FlightController');
const router = require('express').Router();

router.route('/add').post(flightController.addFlight);
router.route('/').get(flightController.getAllFlights);

module.exports = router;  