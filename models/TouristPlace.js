const mongoose = require('mongoose');

const touristPlaceSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  languagesSpoken: {
    type: [String],
    required: true,
  },
  tourTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,  // default to current date/time if not provided
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'upcoming'],  // example statuses
    default: 'pending',
  },
  videoUrl: {
    type: String,  // This will store the video link URL
    required: false // optional field, remove if you want to require it
  },
  imageUrl: {
  type: String, // Use String for image URL (recommended)
  required: false
}

}, { timestamps: true });

module.exports = mongoose.model('TouristPlace', touristPlaceSchema);
