const adminController = require('../Controller/AdminController');
const router = require('express').Router();


router.route('/').get(adminController.getAllAdmins);
router.route('/isThereAdmin').get(adminController.getAdmin);
<<<<<<< HEAD

=======
>>>>>>> 2731a888219f703aeec49ad429efc787ec6d7648
router.route('/add').post(adminController.addAdmin);


module.exports = router;  
<<<<<<< HEAD
//
=======
>>>>>>> 2731a888219f703aeec49ad429efc787ec6d7648
