const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');
const flightRouter = require('./routes/FlightRoutes');
const adminRouter = require('./routes/AdminRoutes');

const guestRouter = require('./routes/GuestRoutes');
const userRouter = require('./routes/UserRoutes');
const UserRoutes = require('./routes/UserRoutes');
const BookingRoutes = require('./routes/BookingRoutes');


// const guestRouter = require('./routes/GuestRoutes');
// const userRouter = require('./routes/UserRoutes');

// const UserRoutes = require('./routes/UserRoutes');
// const BookingRoutes = require('./routes/BookingRoutes');



// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);
app.use('/flights', flightRouter);

app.use('/guest', guestRouter);
app.use('/login',adminRouter);
app.use('/user',userRouter);
app.use('/login',adminRouter );
//app.use('/users',userRoutes);
app.use('/booking',BookingRoutes)


app.use('/guest', guestRouter);
app.use('/login',adminRouter);
app.use('/user',userRouter);
app.use('/login',adminRouter );
app.use('/users',UserRoutes);
app.use('/booking',BookingRoutes)





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
