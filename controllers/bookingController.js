import activityModel from "../models/activityModel.js";
import bookingModel from "../models/bookingModel.js";

export const bookActivity = async (req, res) => {
  try {
    const { activityId } = req.body;
    if (!activityId) {
      return res.status(400).json({ message: "Activity ID is required" });
    }

    const activity = await activityModel.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const alreadyBooked = await bookingModel.findOne({
      user: req.user.id,
      activity: activityId,
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: "Activity already booked" });
    }

    const booking = new bookingModel({
      user: req.user.id,
      activity: activityId,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.user.id })
      .populate("activity");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
