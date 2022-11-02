const express = require("express");
const knex = require("../../db/index");
const { ERROR_MSGS } = require("../../Configs/Constants");

const WorkoutController = {
  getWorkouts: async (req, res) => {
    try {
      const { userid, date } = req.params;
      console.log("userID ", userid, "  date ", date)
      console.log(userid);
      if (userid === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      }

      const data = await knex("workout").select("*").where({ users_id: userid, date:date });
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
        .returning("*")

      console.log("workoutupdate?",data);

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
  postWorkout: async (req, res) => {
    try {
      const { userid, date } = req.params;
      const { name, dayOfWeek } = req.body;
      // solved: body = "name", "dayOfWeek"

      const data = await knex("workout")
        .insert({ name: name, day_of_week: dayOfWeek, users_id: userid, date: date })
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
};

module.exports = WorkoutController;
