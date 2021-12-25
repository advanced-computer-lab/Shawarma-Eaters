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

import EditUser from './components/update-user.component';
import SearchPage from "./components/search-plus.component";
import CreateUser from "./components/create-user.component";

import Seats from './components/Seats/seats.component';
import returnSeats from './components/Seats/returnSeats.component';
import editSeats from './components/Seats/editSeats.component';
import editReturnSeats from './components/Seats/editReturnSeats.component';

import Iten from './components/Iten.component';


import MasterForm from "./components/MasterForm";
import BasicTable from "./components/search/table";

import DepFlights from './components/DepFlights.js';
import RetFlights from './components/RetFlights.js';

import UserProfile from "./components/profile/profile.component";
import summary from "./components/summary.component";

import EmailSend from './components/SendMail/EmailSend';
import DisplayBookings from './components/MyBookings/test';

function App() {
  const [buttonPopup,SetButtonPopup]= useState(false);
  return (
    <Router>
      <div >
      <Navbar />
  
      <Route path="/" exact component={SearchPage} />
      <Route path="/edit/:id" component={UpdateFlight} />
      <Route path="/createflights" component={CreateFlights} />
      <Route path="/flightlist" component={BasicTable} /> 
      <Route path="/login" component={Login} /> 
      <Route path = "/send/:id" component = {EmailSend} />
      <Route path="/loginUser" component={LoginUser} /> 
      <Route path="/delete/:id" component={DeleteFlight} /> 
      <Route path="/myBookings/:id" component={DisplayBookings} /> 

      <Route path="/createuser" component={CreateUser} />
      <Route path="/searchplus" component={SearchPage} />
      <Route path="/edituser/:id" component={EditUser} />

      <Route path="/seats" render={(props) => <Seats {...props} />}/> 
      <Route path="/returnSeats" render={(props) => <returnSeats {...props} />}/> 
      <Route path="/editSeats" render={(props) => <editSeats {...props} />}/> 
      <Route path="/editReturnSeats" render={(props) => <editReturnSeats {...props} />}/> 
      
      <Route path="/returnSeats" component={returnSeats} /> 

      <Route path="/MasterForm" component={MasterForm} />
      <Route path="/profile" component={UserProfile} /> 
      <Route path="/summary" component={summary} />

      <Route path="/Iten" component={Iten} />


      <Route path="/realFlightList" component={FlightList} />

      <Route path="/DepFlights" render={(props) => <DepFlights {...props}/>}/>
      <Route path="/RetFlights" render={(props) => <RetFlights {...props}/>}/>
      



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
