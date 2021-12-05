<<<<<<< HEAD
const userController = require('../Controller/userController');
=======
<<<<<<< HEAD
const userController = require('../Controller/UserController');
=======
const userController = require('../Controller/userController');
>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1
const router = require('express').Router();

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUserById);
<<<<<<< HEAD
=======
<<<<<<< HEAD

router.route('/update/:id').post(userController.updateUserById);
router.route('/depFlights').post(userController.findDepartureFlight);
router.route('/arrFlights').post(userController.findArrivalFlight);
=======
>>>>>>> origin/Sprint-2-person-1

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

<<<<<<< HEAD

// router.route('/sendingMail').get(userController.sendEmail);  //get  not post

=======
>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1

router.route('/:id').delete(userController.deleteUserById);


module.exports = router;  
//