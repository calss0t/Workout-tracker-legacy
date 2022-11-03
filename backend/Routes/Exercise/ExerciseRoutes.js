const express = require("express");
const router = express.Router();
const exercise_ctrl = require("../../Controllers/Exercise/ExerciseController");
const {
  verifyToken,
  validatePutExercise,
} = require("../../Controllers/validationMiddleware");

router.use("/", verifyToken, (req, res, next) => {
  next();
});
router.put("/:exerciseid", validatePutExercise, exercise_ctrl.putExercise);
router.get("/:workoutid", exercise_ctrl.getExercises)
router.post("/:userid/:date", exercise_ctrl.postExercise);
router.get("/fetchExercisesByCategory/:category", exercise_ctrl.fetchExercisesByCategory)

// router.get("/:workoutid", exercise_ctrl.getExerciseCompletion)
router.put("/complete/:exerciseid", exercise_ctrl.putExerciseCompletion);

module.exports = router;
