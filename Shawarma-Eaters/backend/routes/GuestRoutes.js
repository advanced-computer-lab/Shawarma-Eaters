
const guestController = require('../Controller/GuestController');
const router = require('express').Router();

router.route('/').get(guestController.getAllUsers);


router.route('/createUser').post(guestController.createUser);
router.route('/depFlights').post(guestController.findDepartureFlight);
router.route('/arrFlights').post(guestController.findArrivalFlight);



// needs work


//router.route('/isThereAdmin').get(adminController.getAdmin);

module.exports = router;  
//