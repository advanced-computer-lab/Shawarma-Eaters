
const GuestController = require('../Controller/GuestController');
const router = require('express').Router();

router.route('/createUser').post(GuestController.createUser);
router.route('/').get(GuestController.getAllUsers);


// needs work


//router.route('/isThereAdmin').get(adminController.getAdmin);

module.exports = router;  