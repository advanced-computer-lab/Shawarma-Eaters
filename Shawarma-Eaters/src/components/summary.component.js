import React, { Component } from "react";
import { useState,useEffect } from 'react';
import { ReactDOM } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";
import "./ticket.css";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  CardImg,
  CardSubtitle
} from "reactstrap";

import axios from 'axios';

import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";

import SearchPage from "./search-plus.component";
import plane from '../imgs/plane.jpg';
import  '../imgs/img.css';

import { FormGroup, Label, Input } from "reactstrap";
import { Prompt ,Redirect,useLocation,BrowserRouter,withRouter } from 'react-router-dom';


export default class summary extends Component {
    constructor(props) {
        super(props);
    
        // Set the intiial input values
        this.state = {
          user: {},
          dep_flights: [],
          depFlight:{},
          retFlight:{}
          
        };
    }


    
  componentDidMount() {

    axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/')
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get('http://localhost:5000/flights/')
      .then(response => {
        this.setState({ dep_flights: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

    console.log("depArray in master form:",this.state.dep_flights);
    //console.log("retArray in master form:",this.state.dep_flights);


  }



  step3Content() {
    console.log('selected dep flight:',this.state.depFlight);
    console.log('selected ret flight:',this.state.retFlight);

    // return(<>summary</>)
    // if(this.state.depFlight.length==0 || this.state.retFlight.length==0) {
    //   return (<div>
    //     <h1>Sorry no flights selected </h1> <br></br>
    //     <h1>Please go back to our search page</h1>
    //     </div>)
    // }
    
    return(
     <> 
    <div class="ticket">
  <div id="banner">
    <div id="topbanner"></div>
    <span id="mainbanner">
      <img src="../src/components/flyingshawarma.png"></img>
      ShawarmaAir
    </span>
    <span id="tearoffbanner">
      <img src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      ShawarmaAir
    </span>
  </div>
  <div id="barcode">
  <Label>Flight Number : {this.state.depFlight.flight_number}</Label> <br></br>
  </div>
  <div id="data">
    <div id="maindata">
       <div class="box">
        <span class="header">
          Passenger Name
        </span>
        <span class="body">
        <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
        </span> 
      </div>
      <div class="box">
        <span class="header">
          Flight Number
        </span>
        <span class="body">
        {/* <Label>Flight Number : {this.state.depFlight.flight_number}</Label> <br></br> */}
        hhaa
        </span>
      </div>
      <div class="box">
        <span class="header">
          From
        </span>
        <span class="body">
        <Label>depAirport : {this.state.depFlight.depAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          Date
        </span>
        <span class="body">
        <Label>Departure : {this.state.depFlight.departure}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          To
        </span>
        <span class="body">
        <Label>arrAirport : {this.state.depFlight.arrAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
      </div>
     

      <div id="tearoffdata">
        <div class="box">
          <span class="header">
            Passenger Name
          </span>
          <span class="body">
          <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Flight Number
          </span>
          <span class="body">
          <Label>Flight Number : {this.state.depFlight.flight_number}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Date
          </span>
          <span class="body">
          <Label>Departure : {this.state.depFlight.departure}</Label> <br></br>
          </span>
        </div>
       
        <div class="box seat">
          <span class="header">
            Seat
          </span>
          <span class="body">
          <Label>Seat :{this.state.depFlight.economy_seats}</Label> <br></br>
          </span>
        </div>
      </div>
    </div>

    <div id="holes">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  </div>
  <div class="ticket">
  <div id="banner">
    <div id="topbanner"></div>
    <span id="mainbanner">
      <img src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      Shawarma Eaters Airlines
    </span>
    <span id="tearoffbanner">
      <img src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      Shawarma Eaters Airlines
    </span>
  </div>
  <div id="barcode">
  <Label>Flight Number : {this.state.retFlight.flight_number}</Label> <br></br>
  </div>
  <div id="data">
    <div id="maindata">
       <div class="box">
        <span class="header">
          Passenger Name
        </span>
        <span class="body">
        <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
        </span> 
      </div>
      <div class="box">
        <span class="header">
          Flight Number
        </span>
        <span class="body">
        <Label>Flight Number : {this.state.retFlight.flight_number}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          From
        </span>
        <span class="body">
        <Label>depAirport : {this.state.retFlight.depAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          Date
        </span>
        <span class="body">
        <Label>Departure : {this.state.retFlight.departure}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          To
        </span>
        <span class="body">
        <Label>arrAirport : {this.state.retFlight.arrAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
      </div>
     

      <div id="tearoffdata">
        <div class="box">
          <span class="header">
            Passenger Name
          </span>
          <span class="body">
          <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Flight Number
          </span>
          <span class="body">
          <Label>Flight Number : {this.state.retFlight.flight_number}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Date
          </span>
          <span class="body">
          <Label>Departure : {this.state.retFlight.departure}</Label> <br></br>
          </span>
        </div>
       
        <div class="box seat">
          <span class="header">
            Seat
          </span>
          <span class="body">
          <Label>Seat :{this.state.retFlight.economy_seats}</Label> <br></br>
          </span>
        </div>
      </div>
    </div>

    <div id="holes">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  </div>
  </> 
    );



  
  }


  render() {
      return (
        <FormGroup>
            {this.step3Content()}
        </FormGroup>
      )


  }
}

