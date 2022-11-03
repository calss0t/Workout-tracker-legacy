const express = require("express");
const router = express.Router();
const testing_ctrl = require("../Controllers/testingController");

router.post("/:userid/:date", testing_ctrl.postWorkout)
router.put("/wk/:userid/:date", testing_ctrl.putWorkout)
router.get("/fetchExercisesByCategory/:category", testing_ctrl.fetchExercisesByCategory)
router.post("/ex/:userid/:date", testing_ctrl.postExercise)
router.get("/ex/:workoutid", testing_ctrl.getExercises)
router.put("/ex/:exerciseid", testing_ctrl.putExercise)
// router.get("/ex/:workoutid", testing_ctrl.getExerciseCompletion)
router.put("/ex/complete/:exerciseid", testing_ctrl.putExerciseCompletion)

module.exports = router;