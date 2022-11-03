const express = require("express");
const router = express.Router();
const testing_ctrl = require("../Controllers/testingController");

router.get("/fetchExercisesByCategory/:category", testing_ctrl.fetchExercisesByCategory)
router.post("/:userid/:date", testing_ctrl.postWorkout)
router.post("/ex/:userid/:date", testing_ctrl.postExercise)
router.get("/ex/:userid/:date", testing_ctrl.getExercises)
router.put("/ex/:exerciseid", testing_ctrl.putExercise)
router.put("/wk/:userid/:date", testing_ctrl.putWorkout)
router.get("/ex/:workoutid", testing_ctrl.getExerciseCompletion)
router.put("/ex/complete/:exerciseid", testing_ctrl.putExerciseCompletion)

module.exports = router;