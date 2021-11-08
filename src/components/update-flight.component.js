import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class UpdateFlight extends Component {
  constructor(props) {
    super(props);

    this.onChangeFlightNo = this.onChangeFlightNo.bind(this);
    this.onChangeDepTime = this.onChangeDepTime.bind(this);
    this.onChangeArrTime = this.onChangeArrTime.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeEconSeats = this.onChangeEconSeats.bind(this);
    this.onChangeBusiSeats = this.onChangeBusiSeats.bind(this);
    this.onChangeAirport = this.onChangeAirport.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      flight_number: '',
      departure: '',
      arrival_times: '',
      number_of_Economy_seats: 0,
      number_of_Business_class_seats: 0,
      airport:'',
      dates: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/flights/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          flight_number: response.data.flight_number,
          departure: response.data.departure,
          arrival_times: response.data.arrival_times,
          number_of_Economy_seats: response.data.number_of_Economy_seats,
          number_of_Business_class_seats: response.data.number_of_Business_class_seats,
          airport: response.data.airport,
          dates: new Date(response.data.dates)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    
  }

  onChangeFlightNo(e) {
   this.setState({
     flight_number: e.target.value
    })
  }

  onChangeDepTime(e) {
    this.setState({
      departure: e.target.value
    })
  }

  onChangeArrTime(e) {
    this.setState({
      arrival_times: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      dates: date
    })
  }


  onChangeEconSeats(e) {
    this.setState({
      number_of_Economy_seats: e.target.value
    })
  }

  onChangeBusiSeats(e) {
    this.setState({
      number_of_Business_class_seats: e.target.value
    })
  }

  onChangeAirport(e){
    this.setState({
      airport:e.target.value
    })
  }
  

  onSubmit(e) {
    e.preventDefault();

    const flight = {
      flight_number: this.state.flight_number,
      departure: this.state.departure,
      arrival_times: this.state.arrival_times,
      number_of_Economy_seats: this.state.number_of_Economy_seats,
      number_of_Business_class_seats: this.state.number_of_Business_class_seats,
      airport:this.state.airport,
      dates: this.state.dates
    }

    console.log(flight);

    axios.post('http://localhost:5000/flights/update/' + this.props.match.params.id, flight)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Update Flight Information</h3>
      <form onSubmit={this.onSubmit}>
        
        <div className="form-group"> 
          <label>Flight Number: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.flight_number}
              onChange={this.onChangeFlightNo}
              />
        </div>
        <div className="form-group"> 
          <label>Departure Time: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.departure}
              onChange={this.onChangeDepTime}
              />
        </div>
        <div className="form-group"> 
          <label>Arrival Time: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.arrival_times}
              onChange={this.onChangeArrTime}
              />
        </div>
        <div className="form-group"> 
          <label>Economy Class Seats: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.number_of_Economy_seats}
              onChange={this.onChangeEconSeats}
              />
        </div>
        <div className="form-group"> 
          <label>Business Class Seats: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.number_of_Business_class_seats}
              onChange={this.onChangeBusiSeats}
              />
        </div>
        <div className="form-group">
          <label>Airport: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.airport}
              onChange={this.onChangeAirport}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.dates}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Update Flight Information" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}