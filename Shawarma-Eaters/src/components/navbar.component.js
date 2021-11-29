import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">    Available Flights</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/flightlist" className="nav-link">Flight List</Link>
          </li>
          <li className="navbar-item">
          <Link to="/flighttable" className="nav-link">Flight Table</Link>
          </li> 
          <li className="navbar-item">
          <Link to="/createflights" className="nav-link">Create flights</Link>
          </li>
          {/* <li className="navbar-item">
          <Link to="/createflights" className="nav-link">Create flights</Link>
          </li> */}
        </ul>
        </div>
      </nav>
    );
  }
}