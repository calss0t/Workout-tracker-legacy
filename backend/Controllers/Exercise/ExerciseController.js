const express = require("express");
const knex = require("../../db/index");
require("dotenv").config();
const { ERROR_MSGS } = require("../../Configs/Constants");

const ExerciseController = {
  getExercises: async (req, res) => {
    try {
      const { workoutid } = req.params;
      console.log(workoutid)
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
      // console.log(exerciseid);
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
      console.log(data);

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
  // fetches exercises by category (passed in as query string parameter)
  // pass header "images: true" if you only want exercises with images sent
  fetchExercisesByCategory: (req, res) => {
    const exerciseCategories = {
      Abs: "10",
      Arms: "8",
      Back: "12",
      Calves: "14",
      Cardio: "15",
      Chest: "11",
      Legs: "9",
      Shoulders: "13"
    }
    try {
      const { category } = req.params;
      const images = req.get("images");
      let categoryNum = exerciseCategories[category];
      fetch(`https://wger.de/api/v2/exercisebaseinfo/?language=2&category=${categoryNum}`)
        .then(res => res.json())
        .then(res => res.results)
        .then(arr => {
          if (images) {
            let arrWithImages = arr.filter(ex => {
              if (ex.images.length > 0) {
                return ex;
              }
            })
            res.status(200).send(arrWithImages)
          } else {
            res.status(200).send(arr)
          }
        })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR})
    }
  },
  postExercise: async (req, res) => {
    try {
      const { userid, date } = req.params;
      const { name, sets, reps, breakTime } = req.body;
      
      const workoutId = await knex("workout")
        .where({ users_id: userid, date: date })
        .select("id");
      
      const data = await knex("exercise")
        .insert({ name: name, sets: sets, reps: reps, break_time: breakTime, workout_id: workoutId[0].id })
        .returning("*");
            
        if (data.length > 0) {
          res.status(200).json(data);
          return;
        }
      
    } catch (error) {
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  putExerciseCompletion: async (req, res) => {
    try{
      const { exerciseid } = req.params;
      const { completion } = req.body;

      if (exerciseid === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      };

      await knex("exercise")
        .where({ id: exerciseid })
        .update({
          complete: completion
        });
      
      res.status(200).end();

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  }
};

module.exports = ExerciseController;
