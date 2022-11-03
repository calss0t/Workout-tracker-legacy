const express = require("express");
const knex = require("../db/index");
require("dotenv").config();
const { ERROR_MSGS } = require("../Configs/Constants");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const Testing = {
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
      Shoulder: "13",
    };
    try {
      const { category } = req.params;
      const images = req.get("images");
      let categoryNum = exerciseCategories[category];
      console.log(categoryNum);
      fetch(
        `https://wger.de/api/v2/exercisebaseinfo/?language=2&category=${categoryNum}`
      )
        .then((res) => res.json())
        .then((res) => res.results)
        .then((arr) => {
          if (images) {
            let arrWithImages = arr.filter((ex) => {
              if (ex.images.length > 0) {
                return ex;
              }
            });
            res.status(200).send(arrWithImages);
          } else {
            res.status(200).send(arr);
          }
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  postWorkout: async (req, res) => {
    try {
      const { userid, date } = req.params;
      const { name, dayOfWeek } = req.body;
      // solved: body = "name", "dayOfWeek"

      const data = await knex("workout")
        .insert({
          name: name,
          day_of_week: dayOfWeek,
          users_id: userid,
          date: date,
        })
        .returning("*");

      if (data.length > 0) {
        res.status(200).json(data);
        return;
      }
      // res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  postExercise: async (req, res) => {
    try {
      const { userid, date } = req.params;
      const { name, sets, reps } = req.body;

      const workoutId = await knex("workout")
        .where({ users_id: userid, date: date })
        .select("id");

      if (workoutId[0] !== undefined) {
        const data = await knex("exercise")
          .insert({
            name: name,
            sets: sets,
            reps: reps,
            break_time: "120",
            workout_id: workoutId[0].id,
          })
          .returning("*")
          .catch(function (error) {
            console.error(error);
          });

        if (data.length > 0) {
          res.status(200).json(data);
          return;
        }
      } else {
        try {
          const dayOfWeek = new Date(date).getDay();
          // console.log("workoutid",workoutid);

          const workoutId = await knex("workout")
            .insert({
              name: name,
              day_of_week: dayOfWeek,
              users_id: userid,
              date: date,
            })
            .returning("id");

          const data = await knex("exercise")
            .insert({
              name: name,
              sets: sets,
              reps: reps,
              break_time: "120",
              workout_id: workoutId[0].id,
            })
            .returning("*")
            .catch(function (error) {
              console.error(error);
            });

          if (data.length > 0) {
            res.status(200).json(data);
            return;
          }
          // res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        }
      }
    } catch (error) {
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  putWorkout: async (req, res) => {
    try {
      // const { workoutid } = req.params;
      const { userid, date } = req.params;
      const { name, dayOfWeek } = req.body;
      // console.log("workoutid",workoutid);

      if (userid === undefined || date === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      }

      const data = await knex("workout")
        .where({ users_id: userid, date: date })
        .update({ name: name, day_of_week: dayOfWeek })
        .returning("*");

      console.log("workoutupdate?", data);

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
  getExercises: async (req, res) => {
    try {
      const { userid, date } = req.params;
      // console.log(workoutid);
      if (userid === undefined || date === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      }

      const workoutId = await knex("workout")
        .where({ users_id: userid, date: date })
        .select("id");

      // console.log(workoutId);

      const data = await knex("exercise")
        .select("*")
        .where({ workout_id: workoutId[0].id });

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
  getExerciseCompletion: async (req, res) => {
    try {
      const { workoutid } = req.params;

      if (workoutid === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      };

      const data = await knex("exercise")
        .where({ workout_id: workoutid })
        .select("complete", "id");
      
      res.status(200).json(data);

    } catch (error) {
      console.log(error);
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
  // new Date("2022-10-29T00:00:00.000Z").toDateString()
  // Wed Nov 02 2022 16:15:21 GMT+0900
};

module.exports = Testing;

// exercisebaseinfo returns an array with the following type of objects:

/*
{
    "id": 171,
    "uuid": "7de7b8a8-313d-465f-bb22-8527ae45110a",
    "creation_date": "2022-10-11",
    "category": {
      "id": 10,
      "name": "Abs"
    },
    "muscles": [
      {
        "id": 6,
        "name": "Rectus abdominis",
        "name_en": "Abs",
        "is_front": true,
        "image_url_main": "/static/images/muscles/main/muscle-6.svg",
        "image_url_secondary": "/static/images/muscles/secondary/muscle-6.svg"
      }
    ],
    "muscles_secondary": [],
    "equipment": [
      {
        "id": 9,
        "name": "Incline bench"
      }
    ],
    "license": {
      "id": 1,
      "full_name": " Creative Commons Attribution Share Alike 3",
      "short_name": "CC-BY-SA 3",
      "url": "https://creativecommons.org/licenses/by-sa/3.0/deed.en"
    },
    "images": [
      {
        "id": 135,
        "uuid": "70761be3-c07e-4dac-a0a6-b62b4e3c0ab6",
        "exercise_base": 171,
        "image": "https://wger.de/media/exercise-images/56/Decline-crunch-1.png",
        "is_main": true,
        "style": "1",
        "license": 1,
        "license_author": "Everkinetic",
        "author_history": []
      },
      {
        "id": 136,
        "uuid": "081d1f56-c664-4493-9846-b6d6613e0ef7",
        "exercise_base": 171,
        "image": "https://wger.de/media/exercise-images/56/Decline-crunch-2.png",
        "is_main": false,
        "style": "1",
        "license": 1,
        "license_author": "Everkinetic",
        "author_history": []
      }
    ],
    "exercises": [
      {
        "id": 56,
        "uuid": "6f473716-2fc0-453d-9ab7-70212c1d2f92",
        "name": "Crunches an Schrägbank",
        "exercise_base": 171,
        "description": "\n<p>Der Ablauf der Übung ist im Prinzip wie bei den normalen Crunches, nur legst du dich auf eine Schrägbank oder eine andere geeignete Fläche. Stelle sicher, dass du nicht rutschen kannst indem du die Beine über den Rand anwikelst oder sonstwo festhalten kannst. Halte die Hände hinter dem Nacken verschränkt. Aus dieser Position führe den Oberkörper so weit nach oben, bis Kopf oder Ellenbogen die Knie berühren.</p>\n<p>Es ist wichtig, dass dieser Vorgang mit einer rollenden Bewegung durchgeführt wird: die Wirbelsäule sollte sich Wirbel für Wirbel von der Matte lösen. Ein Hohlkreuz ist stets zu vermeiden.</p>\n",
        "creation_date": "2013-05-05",
        "language": 1,
        "aliases": [],
        "notes": [],
        "author_history": [
          "wger.de"
        ]
      },
*/
