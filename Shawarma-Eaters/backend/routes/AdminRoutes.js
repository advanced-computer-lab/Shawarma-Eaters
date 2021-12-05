const adminController = require('../Controller/AdminController');
const router = require('express').Router();


router.route('/').get(adminController.getAllAdmins);
router.route('/isThereAdmin').get(adminController.getAdmin);
<<<<<<< HEAD

=======
>>>>>>> origin/Sprint-2-person-1
router.route('/add').post(adminController.addAdmin);


module.exports = router;  
<<<<<<< HEAD
//
=======
>>>>>>> origin/Sprint-2-person-1
