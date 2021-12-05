import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Prompt } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateFlights extends Component {
  constructor(props) {
    super(props);

    this.onChangeFlightNo = this.onChangeFlightNo.bind(this);
    this.onChangeDepTime = this.onChangeDepTime.bind(this);
    this.onChangeArrTime = this.onChangeArrTime.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeEconSeats = this.onChangeEconSeats.bind(this);
    this.onChangeBusiSeats = this.onChangeBusiSeats.bind(this);
    this.onChangeArrAirport = this.onChangeArrAirport.bind(this);
    this.onChangeDepAirport = this.onChangeDepAirport.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      flight_number: '',
      departure: '',
      arrival_times: '',
      number_of_Economy_seats: 0,
      number_of_Business_class_seats: 0,
      arrAirport:'',
      depAirport:'',
      dates: new Date(),
      
      users: []
    }
  }

  // componentDidMount() {
  //   axios.get('http://localhost:5000/users/')
  //     .then(response => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           users: response.data.map(user => user.username),
  //           username: response.data[0].username
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })

  // }

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

  onChangeArrAirport(e){
    this.setState({
      arrAirport:e.target.value
    })
  }
  onChangeDepAirport(e){
    this.setState({
      depAirport:e.target.value
    })
  }
  //

  onSubmit(e) {
    e.preventDefault();

    const flight = {
        flight_number: this.state.flight_number,
        departure: this.state.departure,
        arrival_times: this.state.arrival_times,
        number_of_Economy_seats: this.state.number_of_Economy_seats,
        number_of_Business_class_seats: this.state.number_of_Business_class_seats,
        arrAirport:this.state.arrAirport,
        depAirport:this.state.depAirport,
        dates: this.state.dates
      }
  
    console.log(flight);

    axios.post('http://localhost:5000/flights/add', flight)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div class="Forumdiv">
      <h3>Create New Flight</h3>
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
          {/* <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select> */}
          
       
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
          <label>Departure Airport: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.depAirport}
              onChange={this.onChangeDepAirport}
              />
        </div>
        <div className="form-group">
          <label>Arrival Airport: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.arrAirport}
              onChange={this.onChangeArrAirport}
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
          <input type="submit" value="Create A Flight!" className="btn btn-primary" />
  
        </div>
        </form>
        
  </div>
  

  
      
    
    )
  }
}