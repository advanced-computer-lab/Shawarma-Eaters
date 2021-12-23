import React, { Component } from "react";
import { useState,useEffect } from 'react';
import ReactDOM  from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";
import "./ticket.css";

import "./Seats/seats.css";
import "./Seats/seat-icon.jpg";
import "./Seats/seat reserved.png";
import "./Seats/seat available.png";

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
const step3Content = <h1>Summary of Dep and Return flight</h1>;



class MasterForm extends Component {
  handleSubmit = ()=> window.location='/myBookings/61a8d3f3ef7267e7fe6a6d4c';
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      user: {},
      dep_flights: [],
      ret_flights: [],
      depFlight:{},
      retFlight:{},    

      seatnumberDep:'',
      occupiedDep:false,

      seatnumberRet:'',
      occupiedRet:false,

      cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: ''
      
    };
    this.step1Validator = this.step1Validator.bind(this);
    this.step2Validator = this.step2Validator.bind(this);


    this.step1Content = this.step1Content.bind(this);
    this.step2Content = this.step2Content.bind(this);
    this.step3Content = this.step3Content.bind(this);
    this.step4Content= this.step4Content.bind(this);

    this.onChangeOccDep = this.onChangeOccDep.bind(this);  
    this.toggleOccDep = this.toggleOccDep.bind(this);  

    this.onChangeOccRet = this.onChangeOccRet.bind(this);  
    this.toggleOccRet = this.toggleOccRet.bind(this);  

    this.fetchData = this.fetchData.bind(this);

    this.step1ContentEmpty= this.step1ContentEmpty.bind(this);
    this.step2ContentEmpty = this.step2ContentEmpty.bind(this);

    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // Bind new functions for next and previous
    //Do I need bind?
   

  }
  


  // Alex
  //  United States
  //  "cabinclass": "Economy",
  //  "arrivalDate":"12/15/2021",
  //  "departureDate":"12/15/2021",
  //  "adults":1,
  //  "children":2
  
   /*componentDidMount(props) {

    // axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/')
    //   .then(response => {
    //     this.setState({ user: response.data })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //   axios.get('http://localhost:5000/flights/')
    //   .then(response => {
    //     this.setState({ dep_flights: response.data })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

      // axios.get('http://localhost:5000/flights/')
      // .then(response => {
      //   this.setState({ retFlight: response.data })
      // })
      // .catch((error) => {
      //   console.log(error);
      // })

      //window.sessionStorage.setItem;

    // this.setState({
    //   dep_flights: localStorage.getItem("depArray"),
    //   dep_flights:localStorage.getItem("retArray"),
    //  });

    //console.log( JSON.parse(window.localStorage.getItem("depArray")));
    //console.log(JSON.parse(window.localStorage.getItem("retArray")));
    depFlights_test=JSON.parse(window.localStorage.getItem("depArray"));
    retFlights_test=JSON.parse(window.localStorage.getItem("retArray"));

    this.setState({ 
      dep_flights:  depFlights_test,
      ret_flights: retFlights_test
    });
    //window.localStorage.clear();

    
    console.log('using local depFlights_test in master form:' ,depFlights_test);
    console.log('using local retFlights_test in master form:' ,retFlights_test);
    console.log("using depArray in master form:",this.props.location.state.depArray);
    console.log("using retArray in master form:",this.props.location.state.retArray);

      console.log(this.props);

    window.localStorage.clear();
     
  }

  */
  
  
  /*
  How componentWillMount() work:
      As you know, the life-cycle hook componentWillMount triggers before the initial render, 
      and the function will only trigger once in the lifespan of a component.
      It is used to update the state value before the DOM is rendered, creating a state variable, as shown below.

      constructor() {
          super();
          this.state = {
            message: "This is initial message"
          };
      }

      As shown above, there is one state variable called message with a default string. 
      Now update the message as shown below.

      componentWillMount() {
          this.setState({ message: "This is an updated message" });
      }

      Once the component gets initiated, 
      the current state value will be overridden with the updated value,
       but keep in mind this happens once in a lifetime of a component.
  */
 //For more info go to this link
 //https://reactjs.org/docs/react-component.html#shouldcomponentupdate
  // componentWillMount() {
  //   axios.post('http://localhost:5000/guest/depFlights',this.props.depSearch).then(result => this.setState({ dep_flights:  result.data})).catch((error) => {
  //     console.log(error);
  //   });
  //   axios.post('http://localhost:5000/guest/arrFlights',this.props.retSearch).then(result => this.setState({ ret_flights:  result.data})).catch((error) => {
  //     console.log(error);
  //   });
  // console.log('propsssssss',this.props);
  
  // axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/')
  //   .then(response => {
  //     this.setState({ user: response.data })
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });  
  
  // }
 
  componentDidUpdate(prevProps, prevState) {

    // if (prevState.dep_flights.length == this.state.dep_flights.length) {
    //   console.log('((((((depFlight state has changed))))))))).')
    // }
    // if (prevState.ret_flights.length !== this.state.ret_flights.length) {
    //   console.log('((((retFlight state has changed.))))))')
    // }
  }

  fetchData = async () => {
   await axios.post('http://localhost:5000/guest/depFlights',this.props.depSearch).then(result => this.setState({ dep_flights:  result.data})).catch((error) => {
        console.log(error);
      });
      await  axios.post('http://localhost:5000/guest/arrFlights',this.props.retSearch).then(result => this.setState({ ret_flights:  result.data})).catch((error) => {
        console.log(error);
      });
    console.log('propsssssss',this.props);

    await  axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c')
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch((error) => {
        console.log(error);
      });  
  }
  componentDidMount() {

    axios.get('http://localhost:5000/users/61a8d3f3ef7267e7fe6a6d4c/')
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch((error) => {
        console.log(error);
      });

     this.fetchData();

      // axios.get('http://localhost:5000/flights/')
      // .then(response => {
      //   this.setState({ retFlight: response.data })
      // })
      // .catch((error) => {
      //   console.log(error);
      // })


    // this.setState({
    //   dep_flights: localStorage.getItem("depArray"),
    //   dep_flights:localStorage.getItem("retArray"),
    //  });

    // console.log(this.props);
    console.log("depArray in master form:",this.state.dep_flights);
    //console.log("retArray in master form:",this.state.dep_flights);

      


     
  }
  



  //Departure
  
  step1Validator() {
   // return true;
  //  return (this.state.dep_flights.length==0)?false:true;
  
  // JSON.stringify(this.state.depFlight.length)
  //!(JSON.stringify(this.state.depFlight)=="{}")
   return !(JSON.stringify(this.state.depFlight)=="{}");
  }
  //Return
  step2Validator() {
    return true;
  //  return !(JSON.stringify(this.state.retFlight)=="{}");
  }

  step3Validator(){
    return true;
  }
  step4Validator(){
    return true;
  }

  step5Validator(){
    return true;
  }

  step6Validator(){
    return true;
  }
  
  //Summary



  //Depature flight cards
  step1Content() {

    return (  
    <div>
      <p>Please select prefered departure flight</p>
      <FormGroup>

  { 
  this.state.dep_flights.map(currentflight =>(
    
      
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
          

            <Button size="small" color="primary" onClick={()=> {
              this.setState({ depFlight: currentflight }) ; 
              window.localStorage.setItem("Selected_Departure_Flight",currentflight);
              alert("Flight Selected !\nPlease proceed to the next page");}}>
            Select
          </Button>
      </CardBody>
      </Card>
      

      )
  )
  }
        </FormGroup>
      
    </div>
    
    );
  }

  //Return flight cards
  step2Content() {
   
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

  //Departure flight seats
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

      <body>
      
      <h2>Flight Seating</h2>
      
      <h4><b>Please select your seat(s) for your departure flight.</b></h4>
      
      <div class="solid1"> 
      <h3>Profile</h3>
      {/* Username: Mohamed Kamal */}
      Username: {this.state.user.firstname +" "+ this.state.user.lastname}
      <br></br>
      {/* Email: MKamal@gmail.com */}
      Email: {this.state.user.email}
      <br></br>
      
      {/* Passport number:38163A13G */}
      Passport number: {this.state.user.passportnumber}
      
      
      </div>
      
      <div class="solid2"> 
      <h3>Flight Details:</h3>
      {/* Flight number: AD2135 */}
      Flight number:{this.state.depFlight.flight_number}
      <br></br>
      {/* Departure time: 16:34 */}
      Departure time:{this.state.depFlight.departure}
      <br></br>
      {/* Arrival time: 18:34 */}
      Arrival time:{this.state.depFlight.arrival_times}
      <br></br>
      Economy Class Seats: {this.state.depFlight.number_of_Economy_seats}
      <br></br>
      Business Class Seats: {this.state.depFlight.number_of_Business_class_seats}
      <br></br>
      Departure Airport: {this.state.depFlight.depAirport}
      <br></br>
      Arrival Airport: {this.state.depFlight.arrAirport}
      <br></br>
      Date: {this.state.depFlight.dates}
      </div>
      
      
      
      
      
      
      <div class="pbody"> 
      <br></br>
      <br></br>
      
      {/* <h3>Business</h3> */}
      <div class="grid-containerBus">
         
          {
          /* <div class="item1"> <button class="button" type="button">A1</button></div>
          <div class="item2"> <button class="button" type="button">B1</button></div>
          <div class="item3"> <button class="button" type="button">C1</button></div>
          <div class="item4"> <button class="button" type="button">D1</button></div>
          <div class="item5"> <button class="button" type="button">E1</button></div>
          <div class="item6"> <button class="button" type="button">A2</button></div>
          <div class="item7"> <button class="button" type="button">B2</button></div>
          <div class="item8"> <button class="button" type="button">C2</button></div>
          <div class="item9"> <button class="button" type="button">D2</button></div>
          <div class="item10"> <button class="button" type="button">E2</button></div>
               */}
              <button id="s1"class="button" onClick={this.econSeat} type="button">1</button>
              <button id="s2"class="button" onClick={this.onChangeOccDep} type="button">2</button>
              <button id="s3"class="button" onClick={this.toggleOccDep} type="button">3</button>
              <button id="s4"class="button" type="button">4</button>
              <button id="s5"class="button" type="button">5</button>
              <button id="s6"class="button" type="button">6</button>
              <button id="s7"class="button" type="button">7</button>
              <button id="s8"class="button" type="button">8</button> 
              <button id="s9"class="button" type="button">9</button>
              <button id="s10"class="reserved" type="button">10</button>
              <button id="s11"class="reserved" type="button">11</button>
              <button id="s12"class="reserved" type="button">12</button>
      </div>
      {/* <h3>Economy</h3> */}
      <br></br>
          <div class="grid-containerEcon">
              
          <button id="s13"class="button" type="button">13</button>
              <button id="s14"class="button" type="button">14</button>
              <button id="s15"class="button" type="button">15</button>
              <button id="s16"class="button" type="button">16</button>
              <button id="s17"class="reserved" type="button">17</button>
              {/* <ToggleButton class="available" value="check" selected={this.state.occupiedDep} onChange={() => {this.setState({occupiedDep:false}) }}>99</ToggleButton> */}
              <button id="s18"class="button" type="button">18</button>
              <button id="s19"class="button" type="button">19</button>
              <button id="s8"class="button" type="button">20</button> 
              <button id="s9"class="button" type="button">21</button>
              <button id="s10"class="button" type="button">22</button>
              <button id="s1"class="button" type="button">23</button>
              <button id="s2"class="button" type="button">24</button>
              <button id="s3"class="button" type="button">25</button>
              <button id="s4"class="button" type="button">26</button>
              <button id="s5"class="reserved" type="button">27</button>
              <button id="s6"class="button" type="button">28</button>
              <button id="s7"class="button" type="button">29</button>
              <button id="s8"class="button" type="button">30</button> 
              <button id="s9"class="button" type="button">31</button>
              <button id="s10"class="button" type="button">32</button>
              <br></br>
              <button id="s1"class="button" type="button">33</button>
              <button id="s2"class="button" type="button">34</button>
              <button id="s3"class="button" type="button">35</button>
              <button id="s4"class="button" type="button">36</button>
              <button id="s5"class="reserved" type="button">37</button>
              <button id="s6"class="button" type="button">38</button>
              <button id="s7"class="button" type="button">39</button>
              <button id="s8"class="button" type="button">40</button> 
              <button id="s9"class="button" type="button">41</button>
              <button id="s10"class="button" type="button">42</button>
              <button id="s1"class="button" type="button">43</button>
              <button id="s2"class="button" type="button">44</button>
              <button id="s3"class="button" type="button">45</button>
               <br></br><button id="s4"class="button" type="button">46</button>
             
      
              <button id="s5"class="reserved" type="button">47</button>
              <button id="s6"class="button" type="button">48</button>
              <button id="s7"class="button" type="button">49</button>
              <button id="s8"class="button" type="button">50</button> 
              <button id="s9"class="button" type="button">51</button>
              <button id="s10"class="button" type="button">52</button>
      </div>
          
          {/* <tbody>
          {seats.map((i) =>{
                  return<div class= {i} > <button class="button" type="button">{seats[i-1]}</button></div> ;
              })}
          </tbody> */}
      
      {/* <Link
        to={{
          pathname: "/summary",
          state: { seats: this.state.seatnumber }
        }}
      /> */}
        
      </div> 
      
      </body>
      
      );



  
  }

  //Return flight seats
  step4Content(){

    return(

      <body>
      
      <h2>Flight Seating</h2>
      
      <h4><b>Please select your seat(s) for your return flight.</b></h4>
      
      <div class="solid1"> 
      <h3>Profile</h3>
      {/* Username: Mohamed Kamal */}
      Username: {this.state.user.firstname +" "+ this.state.user.lastname}
      <br></br>
      {/* Email: MKamal@gmail.com */}
      Email: {this.state.user.email}
      <br></br>
      
      {/* Passport number:38163A13G */}
      Passport number: {this.state.user.passportnumber}
      
      
      </div>
      
      <div class="solid2"> 
      <h3>Flight Details:</h3>
      {/* Flight number: AD2135 */}
      Flight number:{this.state.retFlight.flight_number}
      <br></br>
      {/* Departure time: 16:34 */}
      Departure time:{this.state.retFlight.departure}
      <br></br>
      {/* Arrival time: 18:34 */}
      Arrival time:{this.state.retFlight.arrival_times}
      <br></br>
      Economy Class Seats: {this.state.retFlight.number_of_Economy_seats}
      <br></br>
      Business Class Seats: {this.state.retFlight.number_of_Business_class_seats}
      <br></br>
      Departure Airport: {this.state.retFlight.depAirport}
      <br></br>
      Arrival Airport: {this.state.retFlight.arrAirport}
      <br></br>
      Date: {this.state.retFlight.dates}
      </div>
      
      
      
      
      
      
      <div class="pbody"> 
      <br></br>
      <br></br>
      
      {/* <h3>Business</h3> */}
      <div class="grid-containerBus">
         
          {
          /* <div class="item1"> <button class="button" type="button">A1</button></div>
          <div class="item2"> <button class="button" type="button">B1</button></div>
          <div class="item3"> <button class="button" type="button">C1</button></div>
          <div class="item4"> <button class="button" type="button">D1</button></div>
          <div class="item5"> <button class="button" type="button">E1</button></div>
          <div class="item6"> <button class="button" type="button">A2</button></div>
          <div class="item7"> <button class="button" type="button">B2</button></div>
          <div class="item8"> <button class="button" type="button">C2</button></div>
          <div class="item9"> <button class="button" type="button">D2</button></div>
          <div class="item10"> <button class="button" type="button">E2</button></div>
               */}
              <button id="s1"class="button" onClick={this.econSeat} type="button">1</button>
              <button id="s2"class="button" onClick={this.onChangeOccRet} type="button">2</button>
              <button id="s3"class="button" onClick={this.toggleOccRet} type="button">3</button>
              <button id="s4"class="button" type="button">4</button>
              <button id="s5"class="button" type="button">5</button>
              <button id="s6"class="button" type="button">6</button>
              <button id="s7"class="button" type="button">7</button>
              <button id="s8"class="button" type="button">8</button> 
              <button id="s9"class="button" type="button">9</button>
              <button id="s10"class="reserved" type="button">10</button>
              <button id="s11"class="reserved" type="button">11</button>
              <button id="s12"class="reserved" type="button">12</button>
      </div>
      {/* <h3>Economy</h3> */}
      <br></br>
          <div class="grid-containerEcon">
              
          <button id="s13"class="button" type="button">13</button>
              <button id="s14"class="button" type="button">14</button>
              <button id="s15"class="button" type="button">15</button>
              <button id="s16"class="button" type="button">16</button>
              <button id="s17"class="reserved" type="button">17</button>
              {/* <ToggleButton class="available" value="check" selected={this.state.occupiedDep} onChange={() => {this.setState({occupiedDep:false}) }}>99</ToggleButton> */}
              <button id="s18"class="button" type="button">18</button>
              <button id="s19"class="button" type="button">19</button>
              <button id="s8"class="button" type="button">20</button> 
              <button id="s9"class="button" type="button">21</button>
              <button id="s10"class="button" type="button">22</button>
              <button id="s1"class="button" type="button">23</button>
              <button id="s2"class="button" type="button">24</button>
              <button id="s3"class="button" type="button">25</button>
              <button id="s4"class="button" type="button">26</button>
              <button id="s5"class="reserved" type="button">27</button>
              <button id="s6"class="button" type="button">28</button>
              <button id="s7"class="button" type="button">29</button>
              <button id="s8"class="button" type="button">30</button> 
              <button id="s9"class="button" type="button">31</button>
              <button id="s10"class="button" type="button">32</button>
              <br></br>
              <button id="s1"class="button" type="button">33</button>
              <button id="s2"class="button" type="button">34</button>
              <button id="s3"class="button" type="button">35</button>
              <button id="s4"class="button" type="button">36</button>
              <button id="s5"class="reserved" type="button">37</button>
              <button id="s6"class="button" type="button">38</button>
              <button id="s7"class="button" type="button">39</button>
              <button id="s8"class="button" type="button">40</button> 
              <button id="s9"class="button" type="button">41</button>
              <button id="s10"class="button" type="button">42</button>
              <button id="s1"class="button" type="button">43</button>
              <button id="s2"class="button" type="button">44</button>
              <button id="s3"class="button" type="button">45</button>
               <br></br><button id="s4"class="button" type="button">46</button>
             
      
              <button id="s5"class="reserved" type="button">47</button>
              <button id="s6"class="button" type="button">48</button>
              <button id="s7"class="button" type="button">49</button>
              <button id="s8"class="button" type="button">50</button> 
              <button id="s9"class="button" type="button">51</button>
              <button id="s10"class="button" type="button">52</button>
      </div>
          
          {/* <tbody>
          {seats.map((i) =>{
                  return<div class= {i} > <button class="button" type="button">{seats[i-1]}</button></div> ;
              })}
          </tbody> */}
      
      {/* <Link
        to={{
          pathname: "/summary",
          state: { seats: this.state.seatnumber }
        }}
      /> */}
        
      </div> 
      
      </body>
      
      );


  }

  //Payment method
  step5Content() {

    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form>
        	<input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          ...
        </form>
      </div>
    );
  }

  step6Content(){

    return(
      <> 
      <h1>Summary</h1>
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
   <Label>Flight Number : WG33</Label> <br></br>
   </div>
   <div id="data">
     <div id="maindata">
        <div class="box">
         <span class="header">
           Passenger Name
         </span>
         <span class="body">
         <Label>Username : {this.state.user.firstname +" "+ this.state.user.lastname}</Label> <br></br>
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
        {/* <div class="box">
         <span class="header">
           Passenger Name
         </span>
         <span class="body">
         <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
         </span> 
       </div> */}
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
         {/* <div class="box">
           <span class="header">
             Passenger Name
           </span>
           <span class="body">
           <Label>Username : {this.state.user.firstname && this.state.user.lastname}</Label> <br></br>
           </span>
         </div> */}
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
  

  //----------------------------------------------------------------
  step1ContentEmpty(){      
      return (
      <div>
        <h1>Sorry no departure flights match your search in our database </h1> <br></br>
        <h1>Please go back to our search page</h1>
        </div>);
    }


  step2ContentEmpty(){  
      return (
              <div>
                <h1>Sorry no return flights match your search in our database </h1> <br></br>
                <h1>Please go back to our search page</h1>
                </div>
                );

  }
//------------------------------------------------------------------

//SeatS methods
  onChangeOccDep(sno){
    //console.log("inside onChange");
    this.setState({
        seatnumberDep:sno.target.value,
        occupiedDep:true
    })
    //console.log("Seatnumber: "+this.state.seatnumberDep);
    //console.log("occupiedDep: "+this.state.occupiedDep);
    console.log(document.getElementById('s1').innerHTML );
  //  console.log(this.className);

    
 } 

  toggleOccDep(sno){
    this.setState({
        seatnumberDep:sno.target.value,
        occupiedDep:true
     })
    //  var x = (this.props.occupiedDep===false)?true:false;
    //  this.setState({occupiedDep:x});
    if(this.state.occupiedDep){
        this.setState({
            seatnumberDep:sno.target.value,
            occupiedDep:false
         })
        //  this.toggleClass("reserved");
        document.getElementById("s5").classList.delete("available");
        document.getElementById("s5").classList.add("reserved");
    }else{
        this.setState({
            seatnumberDep:sno.target.value,
            occupiedDep:true
         })
         
         document.getElementById("s5").classList.delete("reserved");
         document.getElementById("s5").classList.add("available");

        //document.getElementById("s1").className += "reserved";
        

    }
     console.log("seatnumberDep: "+this.state.seatnumberDep);
     console.log("occupiedDep: "+this.state.occupiedDep);
 }

 onChangeOccRet(sno){
  //console.log("inside onChange");
  this.setState({
      seatnumberRet:sno.target.value,
      occupiedRet:true
  })
  //console.log("seatnumberRet: "+this.state.seatnumberRet);
  //console.log("occupiedRet: "+this.state.occupiedRet);
  console.log(document.getElementById('s1').innerHTML );
//  console.log(this.className);

  
} 
 
toggleOccRet(sno){
  this.setState({
      seatnumberRet:sno.target.value,
      occupiedRet:true
   })
  //  var x = (this.props.occupiedRet===false)?true:false;
  //  this.setState({occupiedRet:x});
  if(this.state.occupiedRet){
      this.setState({
          seatnumberRet:sno.target.value,
          occupiedRet:false
       })
      //  this.toggleClass("reserved");
      document.getElementById("s5").classList.delete("available");
      document.getElementById("s5").classList.add("reserved");
  }else{
      this.setState({
          seatnumberRet:sno.target.value,
          occupiedRet:true
       })
       
       document.getElementById("s5").classList.delete("reserved");
       document.getElementById("s5").classList.add("available");

      //document.getElementById("s1").className += "reserved";
      

  }
   console.log("seatnumberRet: "+this.state.seatnumberRet);
   console.log("occupiedRet: "+this.state.occupiedRet);
}
////

econSeat(s){

console.log('econseat clicked'+ s);

}


//Cedit card methods
handleInputFocus = (e) => {
  this.setState({ focus: e.target.name });
}

handleInputChange = (e) => {
  const { name, value } = e.target;
  
  this.setState({ [name]: value });
}


  render() {
  //   if(this.state.dep_flights.length!=0 || this.state.ret_flights.length!=0)  {
  //   return (
  //     <div class="MasterForm">

  //     <StepProgressBar 
  //       startingStep={0}
  //       wrapperClass="progress-wrapper-custom"
  //       onSubmit={this.handleSubmit}
  //       submitBtnName="Submit"
  //       previousBtnName="Previous"
  //       nextBtnName="Next"
  //       steps={[
  //         {
  //           label: "Step 1",
  //           name: "step 1",
  //           content: this.step1Content(),
  //           validator:this.step1Validator
  //         },
  //         {
  //           label: "Step 2",
  //           name: "step 2",
  //           content: this.step2Content(),
  //           validator: this.step2Validator
  //         },
  //         {
  //           label: "Step 3",
  //           name: "step 3",
  //           content: this.step3Content(),
  //           validator: true
  //         }
  //       ]}
  //     />
  //   </div>
  //   );
  //     }
  //     else
  // {
  //   return( <div></div>);
  // }



   if(this.state.dep_flights.length==0 && this.state.ret_flights.length==0)  {
    return (
    <>
    <h1><b>Sorry no departure flights match your search in our database </b></h1> <br></br>
      <h1><b>Please go back to our search page</b></h1>
      </>
      );

    }
   else if(this.state.dep_flights.length==0 && this.state.ret_flights.length!=0 ){
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
            content: this.step1ContentEmpty(),
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
            content: this.step3Content(),
            validator: this.step3Validator
          },
          {
            label: "Step 4",
            name: "step 4",
            content: this.step4Content(),
            validator: this.step4Validator

          },
          {
            label: "Step 5",
            name: "step 5",
            content: this.step5Content(),
            validator: this.step5Validator

          },
          {
            label: "Step 6",
            name: "step 6",
            content: this.step6Content(),
            validator: this.step6Validator

          }
        ]}
      />
    </div>
    );
   
   }
   else if(this.state.ret_flights.length!=0 && this.state.ret_flights.length==0){
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
            content: this.step2ContentEmpty(),
            validator: this.step2Validator
          },
          {
            label: "Step 3",
            name: "step 3",
            content: this.step3Content(),
            validator: this.step3Validator
          },
          {
            label: "Step 4",
            name: "step 4",
            content: this.step4Content(),
            validator: this.step4Validator

          },
          {
            label: "Step 5",
            name: "step 5",
            content: this.step5Content(),
            validator: this.step5Validator

          },
          {
            label: "Step 6",
            name: "step 6",
            content: this.step6Content(),
            validator: this.step6Validator

          }
        ]}
      />
    </div>
    );
   }
   else{

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
            content: this.step3Content(),
            validator: this.step3Validator
          },
          {
            label: "Step 4",
            name: "step 4",
            content: this.step4Content(),
            validator: this.step4Validator

          },
          {
            label: "Step 5",
            name: "step 5",
            content: this.step5Content(),
            validator: this.step5Validator

          },
          {
            label: "Step 6",
            name: "step 6",
            content: this.step6Content(),
            validator: this.step6Validator

          }
        ]}
      />
    </div>
    );
   }

  }
  
}

export default MasterForm;



// function a(){
//   if(this.state.dep_flights.length==0 && this.state.ret_flights.length==0)  {
//     return (<div>No departure and arrival flights.</div>);

//     }
//   else if(this.state.dep_flights.length==0 && this.state.ret_flights.length!=0 ){
//     return (
//       <div class="MasterForm">

//       <StepProgressBar 
//         startingStep={0}
//         wrapperClass="progress-wrapper-custom"
//         onSubmit={this.handleSubmit}
//         submitBtnName="Submit"
//         previousBtnName="Previous"
//         nextBtnName="Next"
//         steps={[
//           {
//             label: "Step 1",
//             name: "step 1",
//             content: this.step1ContentEmpty(),
//             validator:true
//           },
//           {
//             label: "Step 2",
//             name: "step 2",
//             content: this.step2Content(),
//             validator: true
//           },
//           {
//             label: "Step 3",
//             name: "step 3",
//             content: this.step3Content(),
//             validator: true
//           }
//         ]}
//       />
//     </div>
//     );
   
//    }
//    else if(this.state.ret_flights.length!=0 && this.state.ret_flights.length==0){
//     return (
//       <div class="MasterForm">

//       <StepProgressBar 
//         startingStep={0}
//         wrapperClass="progress-wrapper-custom"
//         onSubmit={this.handleSubmit}
//         submitBtnName="Submit"
//         previousBtnName="Previous"
//         nextBtnName="Next"
//         steps={[
//           {
//             label: "Step 1",
//             name: "step 1",
//             content: this.step1Content(),
//             validator:true
//           },
//           {
//             label: "Step 2",
//             name: "step 2",
//             content: this.step2ContentEmpty(),
//             validator: true
//           },
//           {
//             label: "Step 3",
//             name: "step 3",
//             content: this.step3Content(),
//             validator: true
//           }
//         ]}
//       />
//     </div>
//     );
//    }
//    else{

//     return (
//       <div class="MasterForm">

//       <StepProgressBar 
//         startingStep={0}
//         wrapperClass="progress-wrapper-custom"
//         onSubmit={this.handleSubmit}
//         submitBtnName="Submit"
//         previousBtnName="Previous"
//         nextBtnName="Next"
//         steps={[
//           {
//             label: "Step 1",
//             name: "step 1",
//             content: this.step1Content(),
//             validator:this.step1Validator
//           },
//           {
//             label: "Step 2",
//             name: "step 2",
//             content: this.step2Content(),
//             validator: this.step2Validator
//           },
//           {
//             label: "Step 3",
//             name: "step 3",
//             content: this.step3Content(),
//             validator: true
//           }
//         ]}
//       />
//     </div>
//     );
//    }
// }
