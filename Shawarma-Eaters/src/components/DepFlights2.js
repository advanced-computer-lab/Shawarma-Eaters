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

import Itinerary, {
    ItinerarySegment,
    ItineraryStatus,
    ItineraryBadgeList,
    ItinerarySegmentStop,
    ItinerarySegmentDetail,
  } from "@kiwicom/orbit-components/lib/Itinerary";
  import { Airplane,Seat,InformationCircle,Entertainment ,Wifi,PowerPlug} from "@kiwicom/orbit-components/icons";
  import Icons from "@kiwicom/orbit-components/lib/icons";
  import Badge from "@kiwicom/orbit-components/lib/Badge";

class DepFlights2 extends Component {
    constructor(props) {
        super(props);

        // Set the intiial input values
        this.state = {
            depFlight:{},
          dep_flights: [],
          redirectNext:false,
          redirectPrev:false,
          oldDepFlight: {},
          color: ''

        }
    }

    //this.props.depSearch
    componentDidMount(props) {


        axios.post('http://localhost:5000/guest/depFlights',this.props.location.state.depSearch).then(result => this.setState({ dep_flights:  result.data})).catch((error) => {
        console.log(error);
      });

      this.setState({oldDepFlight:this.props.location.state.depFlight});
    }


    render() {
      const redirectNext = this.state.redirectNext;
      if (redirectNext && !(JSON.stringify(this.state.depFlight)=="{}") ) {
        return (  
            <Redirect
            to={{
            pathname: "/editSeats",
            state: { 
            depSearch: this.props.location.state.depSearch ,
            retSearch: this.props.location.state.retSearch,
            depFlight : this.state.depFlight,
            economy_seats_dep: this.props.location.state.economy_seats,
            business_seats_dep: this.props.location.state.business_seats,
  
            users: this.props.location.state.users,
            retFlight :this.props.location.state.retFlight,
  
            economy_seats_ret: this.props.location.state.economy_seats,
            business_seats_ret: this.props.location.state.business_seats,

            user:this.props.location.state.user,

            NewBooking: this.props.location.state.NewBooking,
            amountDebit: this.props.location.state.amountDebit,
            amountCredit : this.props.location.state.amountCredit
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
              pathname: "/Search2dep",
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

            user:this.props.location.state.user,

            NewBooking: this.props.location.state.NewBooking,
            amountDebit: this.props.location.state.amountDebit,
            amountCredit : this.props.location.state.amountCredit
                }
            }}
              />


          )
        }
        return (  
            <div>
                {/* <Itinerary   >
                <ItinerarySegment spaceAfter="medium"> */}
                    <u><b><h4>Your old departure flight</h4></b></u>
    <ItinerarySegmentStop
      city={this.props.location.state.depFlight.depAirport}
      station={this.props.location.state.depFlight.depAirport+" Airport"}
      date={this.props.location.state.depFlight.dates}
      time={this.props.location.state.depFlight.departure}
      icon={< Airplane size="large" />}
    />



  {/* </ItinerarySegment>
  </Itinerary> */}
              {console.log(this.state.depFlight)}

                <Button color="primary" size="lg" style={{float:'left'}} onClick={()=>{this.setState({redirectPrev: true});}}>Previous</Button>
                <Button color="primary" size="lg"  onClick={()=>{
                  if (JSON.stringify(this.state.depFlight)=="{}"){
                    alert("Please select a flight 1st");
                  }
                  else{
                    this.setState({redirectNext: true});
                  }
                } } style={{float:'inline-start'}} >Next</Button>
              <FormGroup>

          {  this.state.dep_flights.length==0?<div>
        <h1>Sorry no departure flights match your search in our database </h1> <br></br>
        <h1>Please go back to our search page</h1>
        </div>:

        <div>
          <h4 style={{textAlign:'center'}}><b>Please select prefered departure flight</b></h4>
          {this.state.dep_flights.map(currentflight =>(


              <Card border="dark" style={{ width: '80rem', height: '35rem',border: currentflight._id==this.state.depFlight._id ? this.state.color:""  }}>
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


                    <Button class="btn btn-default" size="small" color="primary" onClick={()=> {
                      this.setState({ depFlight: currentflight ,
                                     color:'0.5rem dashed black'}) ; 
                      window.localStorage.setItem("Selected_Departure_Flight",currentflight);
                      alert("Flight Selected !\nPlease proceed to the next page");}}  active= {(JSON.stringify(this.state.depFlight)=="{}")}

                      >
                    Select
                  </Button>
              </CardBody>
              </Card>


              )
          )}
          </div>
          }
                </FormGroup>

            </div>

            );

    }
}

export default DepFlights2;



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