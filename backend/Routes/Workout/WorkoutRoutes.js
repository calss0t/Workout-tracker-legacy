const express = require("express");
const router = express.Router();
const workout_ctrl = require("../../Controllers/Workout/WorkoutController");
const {
  verifyToken,
  validatePutWorkout,
} = require("../../Controllers/validationMiddleware");

router.use("/", verifyToken, (req, res, next) => {
  next();
});
router.put("/:workoutid", validatePutWorkout, workout_ctrl.putWorkout);//need to change
router.post("/:userid/:date", workout_ctrl.postWorkout);
router.get("/:userid/:date", workout_ctrl.getWorkouts);
module.exports = router;
//:date=> 2022-10-28T00:00:00.000Z
