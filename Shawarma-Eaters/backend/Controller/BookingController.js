const Book = require('../models/booking');

const addBook =  (req,res)=> {

    const bookingNumber = '12';
    const cost = 3000;

  
  
    const newBook = new Book({
        bookingNumber,
        cost
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
    Book.findByIdAndDelete(req.params.id)
      .then(() => res.json('Book deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}


module.exports=
{
    addBook,
    getBookById,
    deleteBookById
}