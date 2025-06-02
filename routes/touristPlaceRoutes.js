// server/routes/touristPlaceRoutes.js
const express = require("express");
const router = express.Router();
const TouristPlace = require("../models/TouristPlace");
const { verifyToken } = require("../middleware/authMiddleware");

// POST /api/tourist-places/add — Add a new tourist place
router.post("/add", async (req, res) => {
  const {
    placeName,
    location,
    languagesSpoken,
    tourTime,
    description,
    price,
    duration,
    addedBy,
    date,
    status,
    videoUrl,
    imageUrl,
  } = req.body;

  if (
    !placeName ||
    !location ||
    !languagesSpoken ||
    !tourTime ||
    !description ||
    !price ||
    !duration ||
    !addedBy ||
    !date ||
    !status ||
    !videoUrl ||
    !imageUrl
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newPlace = new TouristPlace({
      placeName,
      location,
      languagesSpoken,
      tourTime,
      description,
      price,
      duration,
      addedBy,
      date,
      status,
      videoUrl,
      imageUrl,
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all places
// router.get("/places", async (req, res) => {
//   try {
//     const places = await TouristPlace.find();
//     res.json(places);
//   } catch (error) {
//     console.error("Error fetching places:", error);
//     res.status(500).json({ error: "Failed to fetch places" });
//   }
// });

router.get("/places", async (req, res) => {
  try {
    const places = await TouristPlace.find()
      .populate("addedBy", "name") // Populate the `addedBy` field with the name of the user
      .exec();
    res.json(places);
  } catch (err) {
    console.error("Error fetching tourist places:", err);
    res.status(500).json({ error: "Error fetching tourist places" });
  }
});

// UPDATE a place
// router.put('/places/:id', async (req, res) => {
//   try {
//     const { id } = req.params; // Get place ID from URL params
//     const updatedPlace = req.body; // Get the updated place details from the request body

//     // Find the place by ID and update it
//     const place = await TouristPlace.findByIdAndUpdate(id, updatedPlace, { new: true });

//     if (!place) {
//       return res.status(404).json({ message: "Tourist place not found." });
//     }

//     // Respond with the updated place data
//     res.status(200).json(place);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error. Could not update the place." });
//   }
// });

router.put("/places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = { ...req.body };

    // Ensure 'date' is converted to a proper Date object if it's a string
    if (updatedFields.date) {
      const parsedDate = new Date(updatedFields.date);
      if (!isNaN(parsedDate.getTime())) {
        updatedFields.date = parsedDate;
      } else {
        return res.status(400).json({ message: "Invalid date format." });
      }
    }

    const updatedPlace = await TouristPlace.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlace) {
      return res.status(404).json({ message: "Tourist place not found." });
    }

    res.status(200).json(updatedPlace);
  } catch (error) {
    console.error("Error updating tourist place:", error);
    res.status(500).json({ message: "Server error. Could not update the place." });
  }
});

// GET /api/bookings/:bookingId/video
router.get("/:bookingId/video", async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking first
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Find the related tourist place using tourId
    const place = await TouristPlace.findById(booking.tourId);
    if (!place) {
      return res.status(404).json({ message: "Tourist place not found" });
    }

    // Return the videoUrl field
    res.json({ videoUrl: place.videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/places/:id - Delete a place by ID
router.delete("/places/:id", async (req, res) => {
  try {
    const place = await TouristPlace.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("Error deleting place:", error);
    res.status(500).json({ message: "Server error while deleting place" });
  }
});

module.exports = router;
