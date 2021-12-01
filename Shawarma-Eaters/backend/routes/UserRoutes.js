const userController = require('../Controller/UserController');
const router = require('express').Router();

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUserById);

router.route('/update/:id').post(userController.updateUserById);
router.route('/depFlights').post(userController.findDepartureFlight);
router.route('/arrFlights').post(userController.findArrivalFlight);


module.exports = router;  
//