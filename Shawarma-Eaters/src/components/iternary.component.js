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


export default class iternary extends Component {
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
    //     <h1>Sorry no flights selected </h1>  </br></br>
    //     <h1>Please go back to our search page</h1>
    //     </div>)
    // }
    
    return(
     <> 
  
  </> 
    );



  
  }


  render() {
      return (
        <>      
        </>
      )


  }
}


