const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  firstname:{ type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },

  bookings : [{ type:Schema.Types.ObjectId, ref: 'Booking' }],
  passportnumber:{ type: String, required: true },
  password: { type: String, required: true },

  bookings : [{ type:Schema.Types.ObjectId, ref: 'Booking' }],

  // (type:HABD) reservations :{ type: reservations , required: false },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
//