/*
**Booking model contain all information of th booking passengers,booking price and booking flights reference
*/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var booking 	 = new Schema ({

	bookingNumber	: {type:String ,unique:true},
	dep_seats : [String],
	ret_seats : [String],
	outgoingFlightId 	: {type: Schema.Types.ObjectId , ref: 'Flight' },	//reference id to the outGoingFlight number .
	cost 				: Number,
	returnFlightId 		: {type: Schema.Types.ObjectId , ref:'Flight'}, // reference id to the returnFlight number .
	bookingDate			: Date, // booking date will be equal to the current date .
	cabin : {type: String,required: true}

});

module.exports = mongoose.model('Booking', booking);