const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { userId, tourId, guideId, placeName, bookingTime } = req.body;

    if (!userId || !tourId || !guideId || !placeName || !bookingTime) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newBooking = new Booking({
      userId,
      tourId,
      guideId,
      placeName,
      bookingTime,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: "Error creating booking", details: err.message });
  }
};

// Get bookings for a specific user
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate("guideId").populate("userId");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching bookings", details: err.message });
  }
};

module.exports = { createBooking, getUserBookings };
