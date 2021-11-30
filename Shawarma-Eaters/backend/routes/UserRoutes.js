const UserController = require('../Controller/UserController');
const router = require('express').Router();


// router.route('/').get(adminController.getAllAdmins);
// router.route('/isThereAdmin').get(adminController.getAdmin);
// router.route('/add').post(adminController.addAdmin);
//router.route('/').post(userController.sendEmail);


router.route('/sendingMail').get(UserController.sendEmail);  //get  not post


module.exports = router;  