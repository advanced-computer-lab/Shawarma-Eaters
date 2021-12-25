import React, { Component } from "react";
import { useState,useEffect } from 'react';
import ReactDOM  from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";
import "./ticket.css";

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

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
import plane from '../imgs/planeSky.jpg';
import  '../imgs/img.css';


import { FormGroup, Label, Input } from "reactstrap";
import { Prompt ,Redirect,useLocation,BrowserRouter,withRouter } from 'react-router-dom';
import RetFlights from './RetFlights.js';

class DepFlights extends Component {
    constructor(props) {
        super(props);
    
        // Set the intiial input values
        this.state = {
          depFlight:{},
          dep_flights: [],
          redirectNext:false,
          redirectPrev:false,
          color:''
        
        }
    }

    //this.props.depSearch
    componentDidMount(props) {
      console.log(this.props.location.state);
        axios.post('http://localhost:5000/guest/depFlights',this.props.location.state.depSearch).then(result => this.setState({ dep_flights:  result.data})).catch((error) => {
        console.log(error);
      });
    }
    

    render() {
      const redirectNext = this.state.redirectNext;
      if (redirectNext && !(JSON.stringify(this.state.depFlight)=="{}") ) {
        return (  
            <Redirect
            to={{
            pathname: "/seats",
            state: { 
              depSearch: this.props.location.state.depSearch ,
              retSearch: this.props.location.state.retSearch,
              depFlight : this.state.depFlight
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
              pathname: "/"}}
              />
  
          
          )
        }
        return (  
            <div>
              {console.log(this.state.depFlight)}
                
                
             
              <h1 style={{margin:'auto'}} >Please select prefered departure flight:</h1>
              <FormGroup style={{
        boxSizing: 'border-box',
        padding: "10px",
        fontFamily: "Arial",
        flexWrap: 'wrap'
      }}>
        <Button color="primary" size="lg" style={{float:'left'}} 
        onClick={()=>{this.setState({redirectPrev: true});}}>Previous</Button>
                <Button color="primary" size="lg"  onClick={()=>{
                  if (JSON.stringify(this.state.depFlight)=="{}"){
                    alert("Please select a flight 1st");
                  }
                  else{
                    this.setState({redirectNext: true});
                  }
                } } style={{float:'inline-start' ,flexWrap: 'wrap',left:'1100px'}} >Next</Button>
        
          { this.state.dep_flights.length==0?
        <div>
        <h1>Sorry no departure flights match your search in our database 
        <br></br>
        Please go back to our search page
        <a class="btn btn-primary" href="/" role="button">Home</a>
        </h1>
        </div>:
          this.state.dep_flights.map(currentflight =>(
            
              
            <Card border="dark" style={{ width: '80rem', height: '25rem',
            flexWrap: 'wrap', boxSizing: 'border-box',top:'50px',

            border: currentflight._id==this.state.depFlight._id ? this.state.color:""  }}>

           
            <CardBody>
                <CardTitle tag="h5">
                <h1>Departure Flight</h1>
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                >
                  Flight details:
                </CardSubtitle>
        
                <Label>Flight Number : {currentflight.flight_number}</Label> <br></br>

                <Label>Departure Airport : {currentflight.depAirport}</Label>
                <Label>Departure : {currentflight.departure}</Label> 
                <br></br>
                <Label>Arrival Airport : {currentflight.arrAirport}</Label>
                <Label>Arrival Time : {currentflight.arrival_times}</Label> <br></br>
                   
                <Label>Economy seats : {currentflight.number_of_Economy_seats}</Label>  <br></br>      
        
                <Label>Business class seats : {currentflight.number_of_Business_class_seats}</Label>  <br></br>
                  
        
                    <Button class="btn btn-default" size="small" color="primary" onClick={()=> {
                      this.setState({ depFlight: currentflight ,
                        color:'0.5rem dashed black' }) ; 
                      window.localStorage.setItem("Selected_Departure_Flight",currentflight);
                      alert("Flight Selected !\nPlease proceed to the next page");}}  active= {(JSON.stringify(this.state.depFlight)=="{}")}
                      >
                    Select
                  </Button>
              </CardBody> 
              <CardImg className="card-img-top" margin="auto" width="90%" src={plane} alt="Card image cap" />
              </Card>
              
        
              )
          )
          }
                </FormGroup>
              
            </div>
            
            );

    }
}

export default DepFlights;