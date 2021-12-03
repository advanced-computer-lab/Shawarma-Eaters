import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
 import Popup from "./components/popup";
 import {useState} from 'react';
import Navbar from "./components/navbar.component";
import UpdateFlight from "./components/update-flight.component";
import CreateFlights from "./components/create-flights.component";
import FlightTable from "./components/search/table";
import Login from './components/login/Login';
import LoginUser from './components/login/LoginUser';
import FlightList from './components/flight-list.component';
import DeleteFlight from './components/flight-list.component';
import EmailSend from './components/SendMail/EmailSend';
import DisplayBookings from './components/MyBookings/test';

function App() {
  const [buttonPopup,SetButtonPopup]= useState(false);
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={FlightTable} />
      <Route path="/edit/:id" component={UpdateFlight} />
      <Route path="/createflights" component={CreateFlights} />
      <Route path="/flightlist" component={FlightList} /> 
      <Route path="/login" component={Login} /> 
      <Route path = "/send" component = {EmailSend} />
      <Route path="/loginUser" component={LoginUser} /> 
      <Route path="/delete/:id" component={DeleteFlight} /> 
      <Route path="/myBookings/:id" component={DisplayBookings} /> 




      </div>

       {/* <div className="application">
        <main>
          <h1>React Popup</h1>
          <br>
          </br>
          <button onClick={Popup}>Open Popup</button>
        </main>
        <Popup trigger ={buttonPopup} setTrigger ={SetButtonPopup} >
            <h3>My Popup</h3>
          </Popup>
      </div>  */}
    </Router>
  );
}

export default App;
