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
const flightRouter = require('./routes/flights');
const adminRouter = require('./routes/AdminRoutes');
// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);
app.use('/flights', flightRouter);
app.use('/login',adminRouter )
//Mahmoud added this
//app.get('/viewFlights',flightController.viewFlights);
//--

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
