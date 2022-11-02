const express = require("express");
const knex = require("../../db/index");
require("dotenv").config();
const { ERROR_MSGS } = require("../../Configs/Constants");

const ExerciseController = {
  getExercises: async (req, res) => {
    try {
      const { workoutid } = req.params;
      if (workoutid === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      }

      const data = await knex("exercise")
        .select("*")
        .where({ workout_id: workoutid });

      if (data.length > 0) {
        res.status(200).json(data);
        return;
      }
      res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  putExercise: async (req, res) => {
    try {
      const { exerciseid } = req.params;
      const { name, sets, reps, breakTime } = req.body;
      if (exerciseid === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      }

      const data = await knex("exercise")
        .where({ id: exerciseid })
        .update({
          name: name,
          sets: sets,
          reps: reps,
          break_time: breakTime,
        })
        .returning("*");

      if (data.length > 0) {
        res.status(200).json(data);
        return;
      }
      res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = ExerciseController;
