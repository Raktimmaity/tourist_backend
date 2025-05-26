const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // one hotel per user
  },
  hotelName: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  // Add more hotel-specific fields here
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
