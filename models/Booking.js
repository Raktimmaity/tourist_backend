const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TouristPlace',
    required: true
  },
  bookingTime: {
    type: Date,
    default: Date.now
  },
  tourTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  placeName: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  status: {
  type: String,
  enum: ["active", "cancelled"],
  default: "active",
},
paymentStatus: {
  type: String,
  enum: ['Paid', 'Unpaid', 'Failed', 'Pending'],
  default: 'Pending',
},
transactionId: {
  type: String,
},

});

module.exports = mongoose.model('Booking', bookingSchema);
