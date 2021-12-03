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

import Step2 from "./Step2";
import Step3 from "./Step3";

import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";

import MultiStepProgressBar from "./MultiStepProgressBar";

import plane from '../imgs/plane.jpg';
import  '../imgs/img.css';

import { FormGroup, Label, Input } from "reactstrap";


let selected_flight_no=0;

class MasterForm extends Component {
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      currentStep: 1,
      flights: []
      
    };

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/flights/')
      .then(response => {
        this.setState({ flights: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
     
  }

  // Trigger an alert on form submission
  handleSubmit = event => {
    event.preventDefault();
    if (selected_flight_no==0){
      alert(`You did not select your departure flight !`);
    }
    else{
    alert(`Your Departure Flight detail: \n 
      Your Flight Number: ${selected_flight_no}`);
    }
  };

  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep;

    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button color="secondary float-left" onClick={this._prev}>
          Previous
        </Button>
      );
    }

    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return (
        <Button color="primary float-right" onClick={this._next}>
          Next
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 2) {
      return <Button color="primary float-right">Submit</Button>;
    }
    // ...else render nothing
    return null;
  }

  step1Content() {
    
    if (this.state.currentStep !== 1) {
      console.log("Step 1");
      return null;
    }
  
    return (  
    <div>
      <p>Please select prefered departure flight</p>
      <FormGroup>

  { this.state.flights.map(currentflight =>(
    
      
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
          

            <Button size="small" color="primary" onClick={()=> {selected_flight_no=currentflight.flight_number ; alert("Flight Selected !\nPlease proceed to the next page");}}>
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


  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader>Choose your departure and return flight</CardHeader>
            <CardBody>
              <CardTitle>
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              

              {this.step1Content()}
              
              <Step2
                currentStep={this.state.currentStep}

              />
              <Step3
                currentStep={this.state.currentStep}  
              />



            </CardBody>
            <CardFooter>
              {this.previousButton}
              {this.nextButton}
              {this.submitButton}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterForm;
