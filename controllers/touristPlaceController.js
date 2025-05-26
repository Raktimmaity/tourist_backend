// controllers/touristPlaceController.js

const TouristPlace = require('../models/TouristPlace');

// Create a new tourist place
exports.createTouristPlace = async (req, res) => {
  const { placeName, languagesSpoken, tourTime, packagePrice, description } = req.body;
  const tourGuideId = req.user._id;  // From authentication middleware
  const tourGuideName = req.user.name; // From authentication middleware

  try {
    const newTouristPlace = new TouristPlace({
      placeName,
      tourGuideName,
      tourGuideId,
      languagesSpoken,
      tourTime,
      packagePrice,
      description,
    });

    const savedTouristPlace = await newTouristPlace.save();
    res.status(201).json({ message: 'Tourist place added successfully', data: savedTouristPlace });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add tourist place' });
  }
};
