const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');
const flightRouter = require('./routes/FlightRoutes');
const adminRouter = require('./routes/AdminRoutes');
<<<<<<< HEAD
const guestRouter = require('./routes/GuestRoutes');
const userRouter = require('./routes/UserRoutes');
const UserRoutes = require('./routes/UserRoutes');
const BookingRoutes = require('./routes/BookingRoutes');

=======
<<<<<<< HEAD
const guestRouter = require('./routes/GuestRoutes');
const userRouter = require('./routes/UserRoutes');
=======
const UserRoutes = require('./routes/UserRoutes');
const BookingRoutes = require('./routes/BookingRoutes');

>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);
app.use('/flights', flightRouter);
<<<<<<< HEAD
app.use('/guest', guestRouter);
app.use('/login',adminRouter);
app.use('/user',userRouter);
app.use('/login',adminRouter );
app.use('/users',userRoutes);
app.use('/booking',BookingRoutes)

=======
<<<<<<< HEAD
app.use('/guest', guestRouter);
app.use('/login',adminRouter);
app.use('/user',userRouter);
=======
app.use('/login',adminRouter );
app.use('/users',UserRoutes);
app.use('/booking',BookingRoutes)

>>>>>>> origin/person2
>>>>>>> origin/Sprint-2-person-1
//Mahmoud added this
//app.get('/viewFlights',flightController.viewFlights);
//--

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
