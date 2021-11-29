const adminController = require('../Controller/AdminController');
const router = require('express').Router();


router.route('/').get(adminController.getAllAdmins);
router.route('/isThereAdmin').get(adminController.getAdmin);
router.route('/add').post(adminController.addAdmin);

module.exports = router;  