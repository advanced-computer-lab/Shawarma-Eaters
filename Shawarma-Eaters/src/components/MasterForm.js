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
const step3Content = <h1>Summary of Dep and Return flight</h1>;




let depFlight={};
let retFlight={};


class MasterForm extends Component {
  
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      user: {},
      dep_flights: [],
      ret_flights: []
      
    };

    // Bind new functions for next and previous
    //Do I need bind?
   

  }
  

  componentDidMount(props) {

    axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/%27')
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch((error) => {
        console.log(error);
      });

    
    this.setState({
      dep_flights: this.props.location.state.depArray,
      ret_flights:this.props.location.state.retArray
     });

    console.log(this.props);
    console.log("depArray in master form:",this.props.location.state.depArray);
    console.log("retArray in master form:",this.props.location.state.retArray);

      


     
  }

  //Departure
  step1Validator() {
    return (depFlight=={})?false:true;
  }
  //Return
  step2Validator() {
    return (retFlight=={})?false:true;
  }
  
  //Summary
   step3Validator() {
    return true;
  }


  step1Content() {
    if(this.state.dep_flights.length==0) {
      return (<div>
        <h1>Sorry no flights match your search in our database </h1> <br></br>
        <h1>Please go back to our search page</h1>
        </div>)
    }
    console.log("inside content dep flights:");
    console.log(this.state.dep_flights);
  
    return (  
    <div>
      <p>Please select prefered departure flight</p>
      <FormGroup>

  { this.state.dep_flights.map(currentflight =>(
    
      
      <Card>
    <CardImg className="card-img-top" top width="100%" src={plane} alt="Card image cap" />
    <CardBody>
        <CardTitle tag="h5">
        Departure Flight
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Flight details:
        </CardSubtitle>

        <Label>Flight Number : {currentflight.flight_number}</Label> <br></br>
     
        <Label>Departure : {currentflight.departure}</Label> <br></br>
           
        <Label>Economy seats : {currentflight.number_of_Economy_seats}</Label>  <br></br>      

        <Label>Business class seats : {currentflight.number_of_Business_class_seats}</Label>  <br></br>
          

            <Button size="small" color="primary" onClick={()=> {depFlight=currentflight ; alert("Flight Selected !\nPlease proceed to the next page");}}>
            Select
          </Button>
      </CardBody>
      </Card>
      

      )
  )}
        </FormGroup>
      
    </div>
    
    );
  }



  step2Content() {

    if(this.state.ret_flights.length==0) {
      return (<div>
        <h1>Sorry no flights match your search in our database </h1> <br></br>
        <h1>Please go back to our search page</h1>
        </div>)
    }
    console.log("inside content ret flights:");
    console.log(this.state.ret_flights);
  
    return (  
    <div>
      <p>Please select prefered return flight</p>
      <FormGroup>

  { this.state.ret_flights.map(currentflight =>(
    
      
      <Card>
    <CardImg className="card-img-top" top width="100%" src={plane} alt="Card image cap" />
    <CardBody>
        <CardTitle tag="h5">
        Return Flight
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Flight details:
        </CardSubtitle>

        <Label>Flight Number : {currentflight.flight_number}</Label> <br></br>
     
        <Label>Departure : {currentflight.departure}</Label> <br></br>
           
        <Label>Economy seats : {currentflight.number_of_Economy_seats}</Label>  <br></br>      

        <Label>Business class seats : {currentflight.number_of_Business_class_seats}</Label>  <br></br>
          

            <Button size="small" color="primary" onClick={()=> {retFlight=currentflight; alert("Flight Selected !\nPlease proceed to the next page");}}>
            Select
          </Button>
      </CardBody>
      </Card>
      

      )
  )}
        </FormGroup>
      
    </div>
    
    );
  
  }

  step3Content() {
    
    if(depFlight.length==0 || retFlight.length==0) {
      return (<div>
        <h1>Sorry no flights selected </h1> <br></br>
        <h1>Please go back to our search page</h1>
        </div>)
    }
    
    return(
     <> 
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
  <Label>Flight Number : {depFlight.flight_number}</Label> <br></br>
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
        <Label>Flight Number : {depFlight.flight_number}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          From
        </span>
        <span class="body">
        <Label>depAirport : {depFlight.depAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          Date
        </span>
        <span class="body">
        <Label>Departure : {depFlight.departure}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          To
        </span>
        <span class="body">
        <Label>arrAirport : {depFlight.arrAirport}</Label> <br></br>
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
          <Label>Flight Number : {depFlight.flight_number}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Date
          </span>
          <span class="body">
          <Label>Departure : {depFlight.departure}</Label> <br></br>
          </span>
        </div>
       
        <div class="box seat">
          <span class="header">
            Seat
          </span>
          <span class="body">
          <Label>Seat :{depFlight.economy_seats}</Label> <br></br>
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
  <Label>Flight Number : {retFlight.flight_number}</Label> <br></br>
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
        <Label>Flight Number : {retFlight.flight_number}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          From
        </span>
        <span class="body">
        <Label>depAirport : {retFlight.depAirport}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          Date
        </span>
        <span class="body">
        <Label>Departure : {retFlight.departure}</Label> <br></br>
        </span>
      </div>
      <div class="box">
        <span class="header">
          To
        </span>
        <span class="body">
        <Label>arrAirport : {retFlight.arrAirport}</Label> <br></br>
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
          <Label>Flight Number : {retFlight.flight_number}</Label> <br></br>
          </span>
        </div>
        <div class="box">
          <span class="header">
            Date
          </span>
          <span class="body">
          <Label>Departure : {retFlight.departure}</Label> <br></br>
          </span>
        </div>
       
        <div class="box seat">
          <span class="header">
            Seat
          </span>
          <span class="body">
          <Label>Seat :{retFlight.economy_seats}</Label> <br></br>
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
  



  )
  }




  // Trigger an alert on form submission
  //make it normal func if didnt work
  handleSubmit = event => {
    event.preventDefault();
    
    alert(`Your Departure Flight detail: \n 
      Your Departure Flight ID: ${depFlight} \n 
      Your Return Flight ID: ${retFlight}`);
    
  };


  render() {
    const { match, location, history } = this.props
    
    return (
      <div class="MasterForm">

      <StepProgressBar
        startingStep={0}
        wrapperClass="progress-wrapper-custom"
        onSubmit={this.handleSubmit}
        submitBtnName="Submit"
        previousBtnName="Previous"
        nextBtnName="Next"
        steps={[
          {
            label: "Step 1",
            name: "step 1",
            content: this.step1Content(),
            validator:this.step1Validator
          },
          {
            label: "Step 2",
            name: "step 2",
            content: this.step2Content(),
            validator: this.step2Validator
          },
          {
            label: "Step 3",
            name: "step 3",
            content: step3Content,
            validator: this.step3Validator
          }
        ]}
      />
    </div>
    );
  }
}

export default MasterForm;
