import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css"
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

    this.state = {auth: localStorage.getItem("islogin")}
  console.log('auth:',this.state.auth);
  }

  logout()
  {
    console.log('in_logout')
    localStorage.clear();
    this.setState({ auth: false })
    console.log(localStorage.getItem("islogin"))

  }
  

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
          <li className="navbar-item">
          <Link to="/createflights" className="nav-link">Create flights</Link>
          </li>
          { this.state.auth?
          <>
          <li className="navbar-item" color="red">
          <Link to="/myBookings/" className="nav-link" color="red ">My Bookings</Link>
          </li> 
          
          
          <li className="navbar-item">
          <Link to="/edituser/61a8d3f3ef7267e7fe6a6d4c" className="nav-link">My Profile</Link>
          </li> 
          </>:''
          }
          <li className="navbar-item">
          </li> 

       
        </ul>
        <ul className="navbar-nav ms-auto">
          {
            this.state.auth?<Link onClick = {()=> {this.logout()}} to="/loginUser" className="nav-link" >logout</Link>  :  <><Link to="/loginUser" className="nav-link">login</Link> <Link to="/createuser" className="nav-link">signUp</Link></>
          }
          


        </ul>
        </div>
      </nav>
    );
  }
}