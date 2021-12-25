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

import React, { Component } from "react";
import ReactDOM  from 'react';
import axios from 'axios';

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

import { FormGroup, Label, Input } from "reactstrap";
import { Prompt ,Redirect,useLocation,BrowserRouter,withRouter } from 'react-router-dom';

class Iten extends React.Component {
  constructor(props) {
   super(props);

   // Set the intiial input values
   this.state = {

    redirectEditRet:false,
    redirectEditDep:false,
    NewBooking:{}



   }
 }   


  componentDidMount(props) { 
    console.log(this.props);

    var str = ""+ this.props.location.state.depFlight._id;
    var str2= ""+ this.props.location.state.retFlight._id
    const matches = parseInt((str.match(/\d+/g)).join('')); 
    const matches2 = parseInt((str2.match(/\d+/g)).join('')); 
    const sum=Math.floor((matches+matches2)/10000000);
    let NewBooking={};

    // let seatnumberDepEconomy=this.props.location.state.economy_seats_dep[0].seatnumber;
    // let seatnumberDepBusiness=this.props.location.state.business_seats_dep[0].seatnumber;

    // let seatnumberRetEconomy=this.props.location.state.economy_seats_ret[0].seatnumber;
    // let seatnumberRetBusiness=this.props.location.state.business_seats_ret[0].seatnumber;


    //   /booking/add
if(this.props.location.state.depSearch.cabinclass == 'Economy'){
   NewBooking={
    bookingNumber:sum,
    dep_seats:this.props.location.state.depSeats,
    ret_seats:this.props.location.state.depSeats,
    outgoingFlightId:this.props.location.state.depFlight._id,
    cost:100 *(this.props.location.state.depSearch.adults + this.props.location.state.depSearch.children),
    returnFlightId:this.props.location.state.retFlight._id

  }

}else{
   NewBooking={
    bookingNumber:sum,
    dep_seats:this.props.location.state.depSeats,
    ret_seats:this.props.location.state.depSeats,
    cost:1000 *(this.props.location.state.depSearch.adults + this.props.location.state.depSearch.children),
    outgoingFlightId:this.props.location.state.depFlight._id,
    returnFlightId:this.props.location.state.retFlight._id

  }

   this.setState({NewBooking:NewBooking});
}
    axios.post('http://localhost:5000/booking/add',NewBooking).then(result=>{ console.log(result.data)}).catch((error) => {
          console.log(error);
        });



  }


render() {
const redirectEditRet = this.state.redirectEditRet;
      if (redirectEditRet) {
        return (  
            <Redirect
            to={{
            pathname: "/Search2ret",
            state: { 
              depSearch: this.props.location.state.depSearch ,
            retSearch: this.props.location.state.retSearch,
            depFlight : this.props.location.state.depFlight,

            users: this.props.location.state.users,
            retFlight :this.props.location.state.retFlight,

            user:this.props.location.state.user,

            NewBooking: this.state.NewBooking,

          depSeats: this.props.location.state.depSeats,
          retSeats: this.props.location.state.retSeats

                    }
            }}
            />


        )
      }

      const redirectEditDep = this.state.redirectEditDep;
      if (redirectEditDep) {
        return (  
            <Redirect
            to={{
            pathname: "/Search2dep",
            state: { 
              
             depSearch: this.props.location.state.depSearch ,
            retSearch: this.props.location.state.retSearch,
            depFlight : this.props.location.state.depFlight,

            users: this.props.location.state.users,
            retFlight :this.props.location.state.retFlight,
            
            user:this.props.location.state.user,

            NewBooking: this.state.NewBooking,

          depSeats: this.props.location.state.depSeats,
          retSeats: this.props.location.state.retSeats

              }
            }}
            />


        )
      }
      //font-weight: bold;
     return (
         <FormGroup inline={true} row={true} floating={true} style={{fontWeight:'bold'}}>



     <Itinerary   >
     <Button color="primary" size="lg" style={{float:'left'}}  onClick={()=>{this.setState({redirectEditDep: true});}}>Edit Departure Flight</Button>
  <br></br>
  <br></br>
  <ItinerarySegment spaceAfter="medium" style={{background:'coral'}}  >
    <ItinerarySegmentStop
      city={this.props.location.state.depFlight.depAirport}
      station={this.props.location.state.depFlight.depAirport+" Airport , Flight Number "+this.props.location.state.depFlight.flight_number}
      date={this.props.location.state.depFlight.dates}
      time={this.props.location.state.depFlight.departure}
    />
    <ItinerarySegmentDetail
      icon={< Airplane size="small" />}
      duration="2h 30m"
    />
    <ItinerarySegmentStop
      city={this.props.location.state.depFlight.arrAirport}
      station={this.props.location.state.depFlight.arrAirport+" Airport"}
      date={this.props.location.state.depFlight.dates}
      time={this.props.location.state.depFlight.departure}
    />
  </ItinerarySegment>
</Itinerary>

<Itinerary   >
<Button color="primary" size="lg"  onClick={()=>{ this.setState({redirectEditRet: true});} } >Edit Return Flight</Button>

  <ItinerarySegment spaceAfter="medium">
  <ItinerarySegmentStop
      city={this.props.location.state.retFlight.depAirport}
      station={this.props.location.state.retFlight.depAirport+" Airport, Flight Number "+this.props.location.state.retFlight.flight_number}
      date={this.props.location.state.retFlight.dates}
      time={this.props.location.state.retFlight.departure}
    />

    <ItinerarySegmentDetail
      icon={< Airplane size="small" />}
      duration="2h 30m"




    />
    <ItinerarySegmentStop
       city={this.props.location.state.retFlight.arrAirport}
       station={this.props.location.state.retFlight.arrAirport+" Airport"}
       date={this.props.location.state.retFlight.dates}
       time={this.props.location.state.retFlight.departure}
    />

  </ItinerarySegment>
</Itinerary>

   </FormGroup>);
   }
} 

 export default Iten;