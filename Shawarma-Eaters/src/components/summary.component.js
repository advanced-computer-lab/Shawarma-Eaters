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


export default class Summary extends Component {
    constructor(props) {
        super(props);

        // Set the intiial input values
        this.state = {
          user: {},
          redirectNext:false,
          redirectPrev:false

        };
    }



  componentDidMount(props) {
    console.log(this.props.location.state.seatsArray);

console.log(this.props);
    axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/')
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch((error) => {
        console.log(error);
      });


  }
  //   flight_number:  String
//   departure:  String
//   arrival_times: String
//   dates:Date
//   number_of_Economy_seats: Number
//   number_of_Business_class_seats: Number
//   economy_seats:[{ seatnumber:String, occupied:Boolean}]
//   business_seats:[{ seatnumber:String, occupied:Boolean}]
//   depAirport : String
//   arrAirport: String

  render() {
    const redirectNext = this.state.redirectNext;
    if (redirectNext) {
      return (  
          <Redirect
          to={{
          pathname: "/iten",
          state: { 
            depSearch: this.props.location.state.depSearch ,
            retSearch: this.props.location.state.retSearch,
            depFlight : this.props.location.state.depFlight,
  
            economy_seats_dep: this.props.location.state.economy_seats,
            business_seats_dep: this.props.location.state.business_seats,
  
            users: this.props.location.state.users,
            retFlight :this.props.location.state.retFlight,
  
            economy_seats_ret: this.props.location.state.economy_seats,
            business_seats_ret: this.props.location.state.business_seats,

            user:this.state.user

                  }
          }}
          />


      )
    }

    const redirectPrev = this.state.redirectPrev;
    if (redirectPrev) {
      return (  
          <Redirect
          to={{
          pathname: "/returnSeats",
          state: { 
            depSearch: this.props.location.state.depSearch ,
            retSearch: this.props.location.state.retSearch,
            depFlight : this.props.location.state.depFlight,
  
            economy_seats_dep: this.props.location.state.economy_seats,
            business_seats_dep: this.props.location.state.business_seats,
  
            users: this.props.location.state.users,
            retFlight :this.props.location.state.retFlight,
  
            economy_seats_ret: this.props.location.state.economy_seats,
            business_seats_ret: this.props.location.state.business_seats,

            user:this.state.user
            }
          }}
          />


      )
    }
      return (

        <FormGroup>

     <> 
     <Button color="primary" size="lg" onClick={()=>{this.setState({redirectPrev: true});}}  style={{float:'left' , margin:'10%' ,left: '-100px',top: '-100px'}} >Previous</Button>
<Button color="primary" size="lg"  onClick={()=>{ this.setState({redirectNext: true});}} style={{float:'right', margin:'10%',left: '100px',top: '-100px'}} >Next</Button>
    <div class="ticket">
  <div id="banner">
    <div id="topbanner"></div>
    <span id="mainbanner">
      <img id="mainbanner img" src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      Shawarma Eaters Airlines
    </span>
    <span id="tearoffbanner">
      <img id="tearoffbanner img" src="https://lukw4l.de/utils/media/assets/flightticket/plane_logo.png"></img>
      Shawarma Eaters Airlines
    </span>
  </div>
  <div id="barcode">
  <Label>  {this.props.location.state.depFlight.flight_number}</Label> <br></br>
  </div>
  <div id="data">
    <div id="maindata">
       <div class="box">
        <span class="header">
        <i> <h3><strong><p style= {{font:"time new roman" , textTransform: "capitalize"}} >Departure Flight</p></strong></h3></i> 
           <u><b>PASSENGER NAME</b></u>
        </span>
        <span class="body">
        <Label><u><b> </b></u>  {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
        </span> 
      </div>
      <div class="box">
        <span class="header">
           <u><b>Flight Number</b></u> 
        </span>
        <span class="body">
        <Label>{this.props.location.state.depFlight.flight_number}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          <u><b>from</b></u>
        </span>
        <span class="body">
        <Label>  {this.props.location.state.depFlight.depAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
           <u><b>DATE</b></u> 
        </span>
        <span class="body">
        <Label>  {this.props.location.state.depFlight.departure}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          <u><b>to</b></u>
        </span>
        <span class="body">
        <Label>  {this.props.location.state.depFlight.arrAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
      </div>

      <div id="maindata" class="box seat">
          <span class="header">
            <u><b>SEAT</b></u>
          </span>
          <span class="body">
          <Label> {this.props.location.state.depSeats}</Label> <br></br>
          <br></br>
          <b>El seats ya OMAR</b>
          </span>
        </div>


      <div id="tearoffdata">
        <div class="box">
          <span class="header">
             <u><b>PASSENGER NAME</b></u>
          </span>
          <span class="body">
          <Label>  {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
             <u><b>Flight Number</b></u> 
          </span>
          <span class="body">
          <Label>  {this.props.location.state.depFlight.flight_number}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
             <u><b>DATE</b></u> 
          </span>
          <span class="body">
          <Label>  {this.props.location.state.depFlight.departure}</Label> <br></br>
          </span>
        </div>

        <div class="box seat">
          <span class="header">
            <u><b>SEAT</b></u>
          </span>
          <span class="body">
          <Label> {this.props.location.state.retSeats}</Label> <br></br>

          
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
  <Label>  {this.props.location.state.retFlight.flight_number}</Label> <br></br>
  </div>
  <div id="data">
    <div id="maindata">
       <div class="box">
       <i> <h3><strong><p style= {{font:"time new roman" , textTransform: "capitalize"}} >Return Flight</p></strong></h3></i>
        <span class="header">
           <u><b>PASSENGER NAME</b></u>
        </span>
        <span class="body">
        <Label>  {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
        </span> 
      </div>
      <div class="box">
        <span class="header">
           <u><b>Flight Number</b></u> 
        </span>
        <span class="body">
        <Label>  {this.props.location.state.retFlight.flight_number}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">

          <u><b>from</b></u>
        </span>
        <span class="body">
        <Label>  {this.props.location.state.retFlight.depAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
           <u><b>DATE</b></u> 
        </span>
        <span class="body">
        <Label>  {this.props.location.state.retFlight.departure}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          <u><b>to</b></u>
        </span>
        <span class="body">
        <Label>  {this.props.location.state.retFlight.arrAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
      </div>


      <div id="tearoffdata">
        <div class="box">
          <span class="header">
             <u><b>PASSENGER NAME</b></u>
          </span>
          <span class="body">
          <Label>  {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
             <u><b>Flight Number</b></u> 
          </span>
          <span class="body">
          <Label>  {this.props.location.state.retFlight.flight_number}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
             <u><b>DATE</b></u> 
          </span>
          <span class="body">
          <Label>  {this.props.location.state.retFlight.departure}</Label> <br></br>
          </span>
        </div>

        <div class="box seat">
          <span class="header">
            <u><b>SEAT</b></u>
          </span>
          <span class="body">
          <Label> {this.props.location.state.seatnumber}</Label> <br></br>
          
          
          </span>
        </div>
      </div>

      <div id="maindata" class="box seat">
          <span class="header">
            <u><b>SEAT</b></u>
          </span>
          <span class="body">
          <Label> {this.props.location.state.seatnumber}</Label> <br></br>
          <br></br>
          <b>El seats ya OMAR !!!!!!! 12 dih test ana 7atetha</b>
          </span>
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
        </FormGroup>
      );


  }
}