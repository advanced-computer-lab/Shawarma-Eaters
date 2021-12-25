const Book = require('../models/booking');

const getAllBookings = (req,res) => {
  console.log('request came GetALL');
  console.log(req.body); 
  Book.find()
  .then(Book => res.json(Book))
  .catch(err => res.status(400).json('Error: ' + err));
}

const addBook =  (req,res)=> {

    const bookingNumber = req.body.bookingNumber;
    const cost = req.body.cost;
    const outgoingFlightId = req.body.outgoingFlightId;
    const returnFlightId = req.body.returnFlightId;
    const bookingDate = new Date();

    const dep_seats= req.body.dep_seats;
   const  ret_seats= req.body.ret_seats;


    //what seats ?

//bookingNumber
//seats
//outgoingFlightId
//cost
//returnFlightId
//bookingDate
  
  
    const newBook = new Book({
        bookingNumber,
        dep_seats,
        ret_seats,
        outgoingFlightId,
        cost,
        returnFlightId,
        bookingDate
    });
  
    newBook.save()
    .then(() => res.json('Book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  };

const getBookById = (req, res) => {
    Book.findById(req.params.id)
      .then(Book => res.json(Book))
      .catch(err => res.status(400).json('Error: ' + err));
}
const deleteBookById = (req, res) => {
  console.log('deleteBookById is been requested');
    Book.findByIdAndDelete(req.params.id)
      .then(() => res.json('Book deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}


module.exports=
{
    addBook,
    getBookById,
    deleteBookById,
    getAllBookings
}