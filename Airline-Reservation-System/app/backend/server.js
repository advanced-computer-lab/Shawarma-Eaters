const express =  require('express');
const cors =  require('cors');
const mongoose = require('mongoose');  //connect to mongoDB

require('dotenv').config();

//create our express server 
const app = express();
const port = process.env.Port || 5000;


app.use(cors()); //middleware
app.use(express.json()); //since the server will use json format 

// configuration ==========================================================
mongoose.connect(process.env.mongoURL); // connect to our database
//mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const AdminRouter = require('./routes/AdminRoutes');
const FlightRouter = require('./routes/FlightRoutes');

app.use('/login', AdminRouter);
app.use('/flight', FlightRouter);
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
