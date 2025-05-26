const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  experience: { type: Number, required: true, default: 0 },
  bio: { type: String },
  languages: [{ type: String }],
});

// Check if the model already exists before defining it again
module.exports = mongoose.models.TourGuide || mongoose.model('TourGuide', tourGuideSchema);
