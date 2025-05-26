const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  languages: [String],
  bio: String,
  // Add more tour guide-specific fields here
}, { timestamps: true });

module.exports = mongoose.model('TourGuide', tourGuideSchema);
