const express = require("express");
const app = express();
const cors = require("cors");
const timeout = require("connect-timeout");
require("dotenv").config({ path: "./.env.local" });
const defaultRoutes = require("./Routes/DefaultRoutes");
const userRoutes = require("./Routes/User/UserRoutes");
const workoutRoutes = require("./Routes/Workout/WorkoutRoutes");
const exerciseRoutes = require("./Routes/Exercise/ExerciseRoutes");

const PORT = process.env.PORT | 8080;
app.use(express.json());
app.use(timeout("5s"));
app.use(cors());

/** Rules of the API */
app.use((req, res, next) => {
  if (!req.timedout) next();
});

/** Routing */
app.use("/", defaultRoutes);
app.use(`/user`, userRoutes);
app.use(`/workout`, workoutRoutes);
app.use(`/exercise`, exerciseRoutes);

// Not found handling
app.use((req, res, next) => {
  res.status(404);
  const error = new Error("not found");
  next(error);
});

// Errors handling
app.use((error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running and app is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
