const userController = require('../Controller/UserController');
const router = require('express').Router();

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUserById);

router.route('/update/:id').post(userController.updateUserById);


module.exports = router;  
//