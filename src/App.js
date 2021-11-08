import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import UpdateFlight from "./components/update-flight.component";
import CreateFlights from "./components/create-flights.component";
import FlightTable from "./components/flight-table.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={FlightTable} />
      <Route path="/edit/:id" component={UpdateFlight} />
      <Route path="/createflights" component={CreateFlights} />
      <Route path="/flighttable" component={FlightTable} /> 
      <Route path="/exerciseslist" component={ExercisesList} /> 

      </div>
    </Router>
  );
}

export default App;
