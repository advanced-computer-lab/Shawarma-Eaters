import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css"
export default class Navbar extends Component {

  render() {
    return (
      <nav id="navbar" class="navbar" className="navbar navbar-dark bg-dark navbar-expand-lg">
     <div id="logo" src="flyingshawarma" ></div>
        {/* <div id="logo"class="navbar-brand">  */}
        <Link to="/" className="navbar-brand">ShawarmaAir</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/flightlist" className="nav-link">Flight List</Link>
          </li>
          <li className="navbar-item" color="red">
          <Link to="/myBookings/61a8d3f3ef7267e7fe6a6d4c" className="nav-link" color="red ">My Bookings</Link>
          </li> 
          <li className="navbar-item">
          <Link to="/createflights" className="nav-link">Create flights</Link>
          </li>
          {/* <li className="navbar-item">
          <Link to="/searchplus" className="nav-link">Search page</Link>
          </li>  */}
          <li className="navbar-item">
          <Link to="/edituser/61a8d3f3ef7267e7fe6a6d4c" className="nav-link">My Profile</Link>
          </li> 
          <li className="navbar-item">
          <Link to="/createuser" className="nav-link">SIGN UP</Link>
          </li> 

          <li className="navbar-item">
          <Link to="/summary" className="nav-link">summary</Link>
          </li>

          <li className="navbar-item">
          <Link to="/seats" className="nav-link">Seats</Link>
          </li>
          
        </ul>
        </div>
      </nav>
    );
  }
}