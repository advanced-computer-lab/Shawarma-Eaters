
const userController = require('../Controller/userController');

const router = require('express').Router();

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUserById);


router.route('/update/:id').post(userController.updateUserById);
router.route('/depFlights').post(userController.findDepartureFlight);
router.route('/arrFlights').post(userController.findArrivalFlight);


router.route('/update/:id').post(userController.updateUserById);
router.route('/depFlights').post(userController.findDepartureFlight);
router.route('/arrFlights').post(userController.findArrivalFlight);
router.route('/userBookings/:id').get(userController.getUserBookingById);
router.route('/DeleteBookings/:id/:book').put(userController.deleteUserBookById);

router.route('/sendingMail/:id').get(userController.sendEmail);  //get  not post
// router.route('/').get(adminController.getAllAdmins);
// router.route('/isThereAdmin').get(adminController.getAdmin);
// router.route('/add').post(adminController.addAdmin);
//router.route('/').post(userController.sendEmail);


// router.route('/sendingMail').get(userController.sendEmail);  //get  not post


router.route('/:id').delete(userController.deleteUserById);
router.route('/login').post(userController.login);

module.exports = router;  
//