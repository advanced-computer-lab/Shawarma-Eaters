import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Prompt } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// Departure Airport, Arrival Airport, Departure Date, Arrival Date, Adults, Children, Cabin class
export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departureAirport: '',
            arrivalAirport: '',
            depratureDate:new Date(),
            arrivalDate:new Date(),
            adults: 0,
            children:0,
            cabinclass:''
        }
        
    }
    componentDidMount() {
        axios.get('http://localhost:5000/guest/depFlights')
          .then(response => {
            this.setState({
                departureAirport:response.data.departureAirport,
                arrivalAirport:response.data.arrivalAirport,
                depratureDate:response.data.departureDate,
                adults: response.data.adults,
                children: response.data.children,
                cabinclass: response.data.cabinclass
            })   
          })
          .catch(function (error) {
            console.log(error);
          })

         
     }
 
  }