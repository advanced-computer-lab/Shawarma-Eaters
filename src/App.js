// External variables
const { response } = require("express");
const express = require("express");
const mongoose = require('mongoose');
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
const User = require('./models/User');
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected lol ") )
.catch(err => console.log(err));

/*
                                                    Start of your code
*/
app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

// #Routing to usercontroller here

app.get("/getAvengers", (req, res) => {
  //get all with job ="Avengers"
  User.find({Job:'Avenger'}).then((result)=>{
    res.send(result);
  });
});


app.get("/getmarried", (req, res) => {
  //get all with Marital status ="Married"
  User.find({MartialStatus:'Married'}).then((result)=>{
    res.send(result);
  });
});


app.get("/addUser", (req, res) => {
  //add yourself as a user to DB 
  const User = new User({
    "Name":"Omar Elmahdy",
    "Email":"Omar@gmail.com",
    "Age":00,
    "BornIn":"Greece",
    "LivesIn":"Greece",
    "MartialStatus":"Single",
    "PhoneNumber":"0123456789",
    "Job":"Avenger",
    
  });
User.save().then((result)=>{
  res.send(result);
});
});

//SHOULD BE app.post 
//AND USE postman DESKTOP 
//THEN INSISE POSTMAN CHOOSE post , write the link (localhost /addUser )and click send


/*
                                                    End of your code
*/

// Starting server (not hard coding)
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


  //an easier alternate
  // app.listen(8000); 
  //this is hard coding