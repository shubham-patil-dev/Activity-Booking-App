import { model, Schema } from "mongoose";

const activitySchema = new Schema(
  {
    title: String,
    description: String,
    location: String,
    dateTime: Date,
  },
  { versionKey: false }
);

const activityModel = model("activity", activitySchema);

export default activityModel;
