if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
//
// const corsOptions ={
//   origin:'http://localhost:5000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
//
// const passport = require('passport');
// const flash = require('express-flash');
// const session = require('express-session');

//
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// app.use(cors({
//   origin: "http://localhost:5000",
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true,
// }));
 app.use(cors());

app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Passport Config
// require('./config/passport')(passport);
// Express session

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true
//   })
// );
// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.options('*', cors()) 
// var allowCrossDomain = function(req, res, next) {
//   // Website you wish to allow to connect
// res.setHeader('Access-Control-Allow-Origin', '*');

// // Request methods you wish to allow
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// // Request headers you wish to allow
// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// // Set to true if you need the website to include cookies in the requests sent
// // to the API (e.g. in case you use sessions)
// res.setHeader('Access-Control-Allow-Credentials', true);
// next();
// }

// app.use(allowCrossDomain);

// // Connect flash
// app.use(flash());
////
// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//   });

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');
const flightRouter = require('./routes/FlightRoutes');
const adminRouter = require('./routes/AdminRoutes');

const guestRouter = require('./routes/GuestRoutes');
const userRouter = require('./routes/UserRoutes');
const UserRoutes = require('./routes/UserRoutes');
const BookingRoutes = require('./routes/BookingRoutes');


app.use('/flights', flightRouter);
app.use('/guest', guestRouter);
app.use('/login',adminRouter);
app.use('/user',userRouter);
app.use('/login',adminRouter );
app.use('/users',UserRoutes);
app.use('/booking',BookingRoutes)





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
