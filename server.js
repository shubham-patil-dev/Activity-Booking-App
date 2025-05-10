import express from "express";
import "dotenv/config";
import dbConnect from "./db.js";
import authRouter from "./routes/authRouter.js";
import morgan from "morgan";
import activityRouter from "./routes/activityRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import { createActivity } from "./controllers/activityController.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.use("/api/activities", activityRouter);
app.use("/api/bookings", bookingRouter);

//DB and Server Connection
dbConnect();
createActivity()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("error starting server", error);
  });
