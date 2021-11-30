const bookingController = require('../Controller/BookingController');
const router = require('express').Router();


router.route('/:id').get(bookingController.getBookById);
router.route('/add').post(bookingController.addBook);
router.route('/:id').delete(bookingController.deleteBookById);


module.exports = router;  
