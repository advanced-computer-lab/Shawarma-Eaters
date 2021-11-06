const adminController = require('../Controller/AdminController');
const router = require('express').Router();

router.route('/add').post(adminController.addAdmin);
router.route('/').get(adminController.getAllAdmins);

module.exports = router;  