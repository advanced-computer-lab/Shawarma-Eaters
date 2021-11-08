import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Flight = props => (
  <tr>
    <td>{props.flight.flight_number }</td>
    <td>{props.flight.departure}</td>
    <td>{props.flight.arrival_times}</td>
    <td>{props.flight.dates.substring(0,10)}</td>
    <td>{props.flight.number_of_Economy_seats}</td>
    <td>{props.flight.number_of_Business_class_seats}</td>
    <td>{props.flight.airport}</td>
    <td>
      <Link to={"/edit/"+props.flight._id}>edit</Link> | <a href="#" onClick={() => { props.deleteFlight(props.flight._id) }}>delete</a>
    </td>
  </tr>
)

export default class FlightList extends Component {
  constructor(props) {
    super(props);

    this.deleteFlight = this.deleteFlight.bind(this)

    this.state = {flights: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/flights/')
      .then(response => {
        this.setState({ flights: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteFlight(id) {
    axios.delete('http://localhost:5000/flights/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      flights: this.state.flights.filter(el => el._id !== id)
    })
  }

  flightList() {
    return this.state.flights.map(currentflight => {
      return <Flight flight={currentflight} deleteFlight={this.deleteFlight} key={currentflight._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Current Flights </h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Flight Number</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Date</th>
              <th>Number of Economy Seats</th>
              <th>Number of Business Seats</th>
              <th>Airport</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.flightList() }
          </tbody>
        </table>
      </div>
    )
  }
}