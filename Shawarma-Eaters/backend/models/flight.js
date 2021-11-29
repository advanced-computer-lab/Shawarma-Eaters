const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport.
const flightSchema = new Schema({
flight_number: {
type: String,
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
type:Date,
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
depAirport: {
type: String,
required: true
},
arrAirport: {
    type: String,
    required: true
    }
}, { timestamps: true });


// ANAS AYMAN'S FLIGHT SCHEME
// var flightSchema = new schema({
//     flightNumber      :  {type: String},
//     departureDateTime :  { type: Date },
//     arrivalStringTime   :  { type: Date },
//     economySeats      :  {type: Number},
//     businessSeats     :  {type: Number},
//     airPort           :  {type: String},
//     origin            :  { type: String},
//     destination       :  { type: String }
// },{
//     timestamps: true,
//   });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;