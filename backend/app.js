const express = require("express");
const app = express();
const cors = require("cors");
const timeout = require("connect-timeout");
require("dotenv").config({ path: "./.env.local" });
const defaultRoutes = require("./Routes/DefaultRoutes");
const userRoutes = require("./Routes/User/UserRoutes");
const workoutRoutes = require("./Routes/Workout/WorkoutRoutes");
const exerciseRoutes = require("./Routes/Exercise/ExerciseRoutes");
const testingRoutes = require("./Routes/testingRoutes");

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
app.use(`/testing`, testingRoutes);

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

/* exercise API 
GET /api/v2/exercise/

(results is the key to the array of results)
"results": [
  {
      "id": 345,
      "uuid": "c788d643-150a-4ac7-97ef-84643c6419bf",
      "name": "2 Handed Kettlebell Swing",
      "exercise_base": 9,
      "description": "Two Handed Russian Style Kettlebell swing",
      "creation_date": "2015-08-03",
      "category": 10,
      "muscles": [],
      "muscles_secondary": [],
      "equipment": [
          10
      ],
      "language": 2,
      "license": 2,
      "license_author": "deusinvictus",
      "variations": [
          345,
          249
      ],
      "author_history": [
          "deusinvictus"
      ]
  },
*/