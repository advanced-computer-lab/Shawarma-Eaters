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
import plane from '../imgs/plane.jpg';
import  '../imgs/img.css';


import { FormGroup, Label, Input } from "reactstrap";
import { Prompt ,Redirect,useLocation,BrowserRouter,withRouter } from 'react-router-dom';

class RetFlights extends Component {
    constructor(props) {
        super(props);
    
        // Set the intiial input values
        this.state = {
            ret_flights: [],
            retFlight:{},
            redirectNext:false,
            redirectPrev:false

        
        }
    }

    //this.props.depSearch
    componentDidMount(props) {
        axios.post('http://localhost:5000/guest/arrFlights',this.props.location.state.retSearch).then(result => this.setState({ ret_flights:  result.data})).catch((error) => {
            console.log(error);
          });
    }
    

    render() {
        const redirectNext = this.state.redirectNext;
        if (redirectNext && !(JSON.stringify(this.state.depFlight)=="{}")) {
          return (  
              <Redirect
              to={{
              pathname: "/seats",
              state: { 
                depSearch: this.props.location.state.depSearch ,
                retSearch: this.props.location.state.retSearch,
                depFlight : this.props.location.state.depFlight,
                retFlight : this.state.retFlight,
        
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
              pathname: "/DepFlights",
              state: { 
                depSearch: this.props.location.state.depSearch ,
                retSearch: this.props.location.state.retSearch
                }
              }}
              />
  
          
          )
        }
        return (  
            <div>
                {console.log(this.state.retFlight)}
                
                <Button color="primary" size="lg" style={{float:'left'}}    onClick={()=>{this.setState({redirectPrev: true});}}>Previous</Button>
                <Button color="primary" size="lg"  onClick={()=>{   
                  if (JSON.stringify(this.state.retFlight)=="{}"){
                    alert("Please select a flight 1st");
                  }
                  else{
                    this.setState({redirectNext: true});

                  }
                } } style={{float:'inline-start'}} >Next</Button>
              <h4><b>Please select prefered return flight</b></h4>
                <FormGroup>

            {   this.state.ret_flights.length==0?<div>
        <h1>Sorry no Return flights match your search in our database </h1> <br></br>
        <h1>Please go back to our search page</h1>
        <button onClick="window.location.href='/';">Home</button>
        </div>: this.state.ret_flights.map(currentflight =>(
            
                
                <Card border="dark" style={{ width: '80rem', height: '35rem' }}>
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
            
                <Label>Departure Airport : {currentflight.depAirport}</Label>
                <Label>Departure : {currentflight.departure}</Label> 
                <br></br>
                <Label>Arrival Airport : {currentflight.arrAirport}</Label>
                <Label>Arrival Time : {currentflight.arrival_times}</Label> <br></br> 
                                   
                <Label>Economy seats : {currentflight.number_of_Economy_seats}</Label>  <br></br>      

                <Label>Business class seats : {currentflight.number_of_Business_class_seats}</Label>  <br></br>
                    

                    <Button size="small" color="primary" onClick={()=> { 
                        this.setState({ retFlight: currentflight });  
                        window.localStorage.setItem('Selected_Return_Flight', currentflight);
                    alert("Flight Selected !\nPlease proceed to the next page");
                    }}>
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
}

export default RetFlights;