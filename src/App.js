// External variables
const { response } = require("express");
const express = require("express");
const { Db } = require("mongodb");
const mongoose = require('mongoose');
const { db } = require("./models/User");
// const is the declaration in JS like int, string,..
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Because it doesnt handel Errors
const MongoURI = 'mongodb+srv://atlasDB:mongodb1234@cluster0.vt5cm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;
// the above link creates atlas cluster and database in mongoos

//App variables
const app = express();  
  //creates new express app
const port = process.env.PORT || "8000";
  // listen to port or port8000
const Flight = require('./models/User');
// #Importing the userController
// var express = require('express');
var path = require('path');
var fs = require('fs');
var assert = require('assert');


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected lol ") )
.catch(err => console.log(err));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get("/", (req, res) => {
  res.redirect('/List');
});
app.get("/List", (req, res) => {
  //flight-number, 
  // departure 
  //  arrival_times, 
  //  dates,
  //   number_of_Economy_seats,
  //    number_of_Business_class_seats, 
  //     airport.
  
  //Flight.collection.deleteMany({ });

  // const Flight1 = new Flight({
  //   flight_number:4665,
  //   departure:"2:00 am",
  //   arrival_times:"10:30 pm",
  //   dates:"1/2/2021",
  //   number_of_Economy_seats:200,
  //   number_of_Business_class_seats:100,
  //   airport:"Airfrance",
   
    
  // });
  // const Flight2 = new Flight({
  //   flight_number:2132,
  //   departure:"5:00 pm",
  //   arrival_times:"2:00 am",
  //   dates:"1/11/2021",
  //   number_of_Economy_seats:435,
  //   number_of_Business_class_seats:230,
  //   airport:"Airegypt",
   
    
  // });
  
  
  // Flight1.save();
  // Flight2.save();

  var resultArr =[];

  Flight.find((err, docs) => {
      if (!err) {
          res.render("list", {
              data: docs
          });
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });

});



// Starting server (not hard coding)
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


  //an easier alternate
  // app.listen(8000); 
  //this is hard coding