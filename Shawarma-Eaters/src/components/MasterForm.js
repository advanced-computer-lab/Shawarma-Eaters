import React, { Component } from "react";
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




let depFlight_id=0;
let retFlight_id=0;


class MasterForm extends Component {
  
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      dep_flights: [],
      ret_flights: []
      
    };

    // Bind new functions for next and previous
    //Do I need bind?
   

  }
  

  componentDidMount(props) {
    
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
    return (depFlight_id==0)?false:true;
  }
  //Return
  step2Validator() {
    return (retFlight_id==0)?false:true;
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
          

            <Button size="small" color="primary" onClick={()=> {depFlight_id=currentflight._id ; alert("Flight Selected !\nPlease proceed to the next page");}}>
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
          

            <Button size="small" color="primary" onClick={()=> {retFlight_id=currentflight._id ; alert("Flight Selected !\nPlease proceed to the next page");}}>
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




  // Trigger an alert on form submission
  //make it normal func if didnt work
  handleSubmit = event => {
    event.preventDefault();
    
    alert(`Your Departure Flight detail: \n 
      Your Departure Flight ID: ${depFlight_id} \n 
      Your Return Flight ID: ${retFlight_id}`);
    
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
