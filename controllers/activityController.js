import activityModel from "../models/activityModel.js";

export const listActivities = async (req, res) => {
  try {
    const activities = await activityModel.find();
    res.status(200).json(activities);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve activities", error: err.message });
  }
};

//create activity
export async function createActivity(req, res) {
  try {
    const defaultActivities = [
      {
        title: "Cricket Championship",
        description: "A fun cricket match",
        location: "International Stadium, Kerala",
        dateTime: new Date("2025-05-11T09:00:00Z"),
      },
      {
        title: "Friday Night Movie",
        description: "Watch the latest blockbuster",
        location: "PVR Cinemas, Mumbai",
        dateTime: new Date("2025-05-12T18:00:00Z"),
      },
      {
        title: "National Football League Finals",
        description: "Exciting football match",
        location: "Salt Lake Stadium, Kolkata",
        dateTime: new Date("2025-05-14T20:00:00Z"),
      },
    ];

    for (const activity of defaultActivities) {
      const existingActivity = await activityModel.findOne({
        title: activity.title,
      });
      if (!existingActivity) {
        await activityModel.create(activity);
      }
    }
  } catch (error) {
    console.error("Error creating default activities:", error);
  }
}
