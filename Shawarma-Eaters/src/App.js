import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
 import Popup from "./components/popup";
 import {useState} from 'react';
import Navbar from "./components/navbar.component";
import UpdateFlight from "./components/update-flight.component";
import CreateFlights from "./components/create-flights.component";
import FlightTable from "./components/search/table";
//import Login from './components/login/Login';
import LoginUser from './components/login/LoginUser';
import FlightList from './components/flight-list.component';
import DeleteFlight from './components/flight-list.component';

import EditUser from './components/update-user.component';
import SearchPage from "./components/search-plus.component";
import CreateUser from "./components/login/signUp";

import Seats from './components/Seats/seats.component';
import ReturnSeats from './components/Seats/returnSeats.component';
import EditSeats from './components/Seats/editSeats.component';
import EditReturnSeats from './components/Seats/editReturnSeats.component';

import Iten from './components/Iten.component';

import Search2dep from './components/search2dep.js';
import Search2ret from './components/search2ret.js';

import DepFlights2 from './components/DepFlights2.js';
import RetFlights2 from './components/RetFlights2.js';


import MasterForm from "./components/MasterForm";
import BasicTable from "./components/search/table";

import DepFlights from './components/DepFlights.js';
import RetFlights from './components/RetFlights.js';

import UserProfile from "./components/profile/profile.component";
import Summary from "./components/summary.component";

import EmailSend from './components/SendMail/EmailSend';
import DisplayBookings from './components/MyBookings/test';
import Login from './components/login/Login';
function App() {
  const [buttonPopup,SetButtonPopup]= useState(false);
  
//  window.onbeforeunload = () => {
//   localStorage.clear()
// }
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
      <Route path="/myBookings/" component={DisplayBookings} /> 
      <Route path="/searchplus" component={SearchPage} />
      <Route path="/edituser/:id" component={EditUser} />

      <Route path="/seats" render={(props) => <Seats {...props} />}/> 
      <Route path="/returnSeats" render={(props) => <ReturnSeats {...props} />}/> 
      <Route path="/editSeats" render={(props) => <EditSeats {...props} />}/> 
      <Route path="/editReturnSeats" render={(props) => <EditReturnSeats {...props} />}/> 
      
      {/* <Route path="/returnSeats" component={returnSeats} />  */}

      <Route path="/MasterForm" component={MasterForm} />
      <Route path="/profile" component={UserProfile} /> 
      <Route path="/createuser" component={CreateUser} /> 

      <Route path="/iten" render={(props) => <Iten {...props}/>}/>
      <Route path="/summary" render={(props) => <Summary {...props}/>}/>

      {/* <Route path="/summary" component={summary} />
      <Route path="/Iten" component={Iten} /> */}

      <Route path="/realFlightList" component={FlightList} />

      <Route path="/DepFlights" render={(props) => <DepFlights {...props}/>}/>
      <Route path="/RetFlights" render={(props) => <RetFlights {...props}/>}/>

      <Route path="/Search2dep" render={(props) => <Search2dep {...props}/>}/>
      <Route path="/Search2ret" render={(props) => <Search2ret {...props}/>}/>

      <Route path="/DepFlights2" render={(props) => <DepFlights2 {...props}/>}/>
      <Route path="/RetFlights2" render={(props) => <RetFlights2 {...props}/>}/>
      



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
