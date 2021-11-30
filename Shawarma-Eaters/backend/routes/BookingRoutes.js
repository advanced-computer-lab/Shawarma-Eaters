const bookingController = require('../Controller/BookingController');
const router = require('express').Router();

//Getting Tickets
router.route('/').get(bookingController.getAllBookings);
router.route('/:id').get(bookingController.getBookById);

//ADDing
router.route('/add').post(bookingController.addBook);

//Deleting
router.route('/:id').delete(bookingController.deleteBookById);



module.exports = router;  
