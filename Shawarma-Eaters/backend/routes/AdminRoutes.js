const adminController = require('../Controller/AdminController');
const router = require('express').Router();

router.route('/add').post(adminController.addAdmin);
router.route('/').get(adminController.getAllAdmins);
router.route('/isThereAdmin').get(adminController.getAdmin);

module.exports = router;  
//