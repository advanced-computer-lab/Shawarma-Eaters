const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport.
const flightSchema = new Schema({
  flight_number: {
    type: Number,
    required: true,
  },
  departure: {
    type: String,
    required: true
  },
  arrival_times: {
    type: String,
    required: true,
  },
  dates:{
    type:String,
    required: true
  },
  number_of_Economy_seats: {
    type: Number,
    required: true
  },
  number_of_Business_class_seats: {
    type: Number,
    required: true
  },
  airport: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;