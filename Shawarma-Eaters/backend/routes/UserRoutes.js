const adminController = require('../Controller/AdminController');
const router = require('express').Router();


router.route('/').get(adminController.getAllAdmins);
router.route('/isThereAdmin').get(adminController.getAdmin);
router.route('/add').post(adminController.addAdmin);
//router.route('/').post(userController.sendEmail);
router.route('/').get(userController.sendEmail);


module.exports = router;  