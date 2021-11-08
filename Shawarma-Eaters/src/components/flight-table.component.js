// Mahmoud made this file 
//this page shows available flights
import axios from 'axios';
import React, { Component } from "react";
import { Link } from 'react-router-dom';

//make sure to npm install this lib
import { MDBDataTable } from 'mdbreact';

class FlightTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        flights: [],
        columns: []
    };
  }


  componentDidMount() {

    axios.get('http://localhost:5000/flights/')
    .then(response => {
      this.setState({ flights: response.data })
    })
    .catch((error) => {
      if(this.state.flights.length===0)
      {console.log("No data dude !!!!")}
      console.log(error);
    })
    let columns = [
     
      {
        label: "Flight Number",
        field: "flight_number",
        sort: 'asc',
        width: 200

      },
      {
        label: "Departure",
        field: "departure",
        sort: 'asc',
        width: 200

      },
      {
        label: "Arrival",
        field: "arrival_times",
        sort: 'asc',
        width: 200

      },
      {
        label: "Dates",
        field: "dates",
        sort: 'asc',
        width: 200
      },
      {
        label: "Economy seats",
        field: "number_of_Economy_seats",
        sort: 'asc',
        width: 200

      },
      {
        label: "Business seats",
        field: "number_of_Business_class_seats",
        sort: 'asc',
        width: 200
      },
      {
        label: "Airport Terminals",
        field: "airport",
        sort: 'asc',
        width: 200
      }
    ];
    this.setState({ columns });
  }
  

  render() {
    
    let { flights, columns } = this.state;
    const data = {columns : columns ,rows: flights}
    console.log(data);
    
    return (
      
      <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
    
    );
    
  }
}

export default  FlightTable;