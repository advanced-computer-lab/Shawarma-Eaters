<<<<<<< HEAD
const userController = require('../Controller/UserController');
=======
<<<<<<< HEAD
const userController = require('../Controller/UserController');
=======
const userController = require('../Controller/userController');
>>>>>>> origin/person2
>>>>>>> 2731a888219f703aeec49ad429efc787ec6d7648
const router = require('express').Router();

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUserById);
<<<<<<< HEAD

router.route('/update/:id').post(userController.updateUserById);
router.route('/depFlights').post(userController.findDepartureFlight);
router.route('/arrFlights').post(userController.findArrivalFlight);
<<<<<<< HEAD
// router.route('/').get(adminController.getAllAdmins);
// router.route('/isThereAdmin').get(adminController.getAdmin);
// router.route('/add').post(adminController.addAdmin);
//router.route('/').post(userController.sendEmail);


router.route('/sendingMail').get(userController.sendEmail);  //get  not post

=======
=======

router.route('/update/:id').post(userController.updateUserById);
router.route('/depFlights').post(userController.findDepartureFlight);
router.route('/arrFlights').post(userController.findArrivalFlight);
router.route('/userBookings/:id').get(userController.getUserBookingById);
router.route('/DeleteBookings/:id/:book').put(userController.deleteUserBookById);

router.route('/sendingMail/:id').get(userController.sendEmail);  //get  not post

>>>>>>> origin/person2
>>>>>>> 2731a888219f703aeec49ad429efc787ec6d7648

router.route('/:id').delete(userController.deleteUserById);


module.exports = router;  
//