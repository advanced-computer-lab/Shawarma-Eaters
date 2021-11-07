var mongoose = require('mongoose');
var schema = mongoose.Schema;

var flightSchema = new schema({
    flightNumber      :  {type: String},
    departureDateTime :  { type: Date },
    arrivalStringTime   :  { type: Date },
    economySeats      :  {type: Number},
    businessSeats     :  {type: Number},
    airPort           :  {type: String},
    origin            :  { type: String},
    destination       :  { type: String }
},{
    timestamps: true,
  });

module.exports = mongoose.model('Flight', flightSchema);