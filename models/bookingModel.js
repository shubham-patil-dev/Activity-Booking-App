import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    activity: { type: Schema.Types.ObjectId, ref: "activity" },
  },
  { versionKey: false }
);

const bookingModel = model("booking", bookingSchema);

export default bookingModel;
