import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
 import Popup from "./components/popup";
 import {useState} from 'react';
import Navbar from "./components/navbar.component";
import UpdateFlight from "./components/update-flight.component";
import CreateFlights from "./components/create-flights.component";
import FlightTable from "./components/flight-table.component";
import Login from './components/login/Login';
import LoginUser from './components/login/LoginUser';
import FlightList from './components/flight-list.component';
import DeleteFlight from './components/flight-list.component';

import CreateUser from "./components/create-user.component";

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
      <Route path="/flighttable" component={FlightTable} /> 
      <Route path="/flightlist" component={FlightList} /> 
      <Route path="/login" component={Login} /> 
      <Route path="/loginUser" component={LoginUser} /> 
      <Route path="/delete/:id" component={DeleteFlight} /> 
      <Route path="/createuser" component={CreateUser} />




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
//
