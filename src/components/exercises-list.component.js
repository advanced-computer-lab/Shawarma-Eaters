import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Flight = props => (
  <tr>
    <td>{props.flight.flight_number }</td>
    <td>{props.flight.departure}</td>
    <td>{props.flight.airport}</td>
    <td>{props.flight.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.flight._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.flight._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {flight: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/flight/')
      .then(response => {
        this.setState({ flight: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/flight/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Flight exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}