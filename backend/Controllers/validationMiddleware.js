const express = require("express");
const jwt = require("jsonwebtoken");
const { ERROR_MSGS, REGEXES } = require("../Configs/Constants");
require("dotenv").config();
const knex = require("../db/index");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    if (authHeader.split(" ")[0] === "Bearer") {
      try {
        const token = jwt.verify(
          authHeader.split(" ")[1],
          process.env.JWT_SECRET || "my_secret"
        );
        if (Date.now() < token.exp * 1000) {
          console.log(token);
          next();
        } else {
          res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
        }
      } catch (e) {
        console.log(e.message);
        res.status(401).json({ error: e.message });
      }
    } else {
      res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
    }
  } else {
    res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
  }
};

const validatePostUser = async (req, res, next) => {
  const { email } = req.body;
  const errorMessage = [];
  const isEmailValid = email.match(REGEXES.EMAIL);
  if (!isEmailValid) {
    errorMessage.push(ERROR_MSGS.INVALID_EMAIL);
  }

  const data = await knex.select("*").from("user").where({ email: email });
  if (data.length > 0) {
    errorMessage.push(ERROR_MSGS.EMAIL_IN_USE);
  }

  if (errorMessage.length > 0) {
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  } else {
    next();
    return;
  }
};

const validatePutExercise = async (req, res, next) => {
  const { exerciseid } = req.params;
  const { name, sets, reps, breakTime, workoutid } = req.body;
  const isRequestValid = [name, sets, reps, breakTime].some(
    (value) => value !== undefined
  );
  const errorMessage = [];

  if (!isRequestValid) errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  if (name === "") errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  if (name) {
    typeof name !== "string"
      ? errorMessage.push(ERROR_MSGS.INVALID_INPUT)
      : null;
  }
  if (sets) {
    !Number(sets) ? errorMessage.push(ERROR_MSGS.INVALID_INPUT) : null;
  }
  if (reps) {
    !Number(reps) ? errorMessage.push(ERROR_MSGS.INVALID_INPUT) : null;
  }
  if (breakTime) {
    !Number(breakTime) ? errorMessage.push(ERROR_MSGS.INVALID_INPUT) : null;
  }
  const data = await knex("exercise").select("*").where({ id: exerciseid });
  if (data.length <= 0) errorMessage.push(ERROR_MSGS.NOT_FOUND);

  if (errorMessage.length > 0) {
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    console.log(errorMessage);
    return;
  } else {
    next();
    return;
  }
};

const validatePutWorkout = async (req, res, next) => {
  const { workoutid } = req.params;
  const { name, dayOfWeek } = req.body;
  const isRequestValid = [name, dayOfWeek].some((value) => value !== undefined);
  const errorMessage = [];

  if (!isRequestValid) errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  if (name === "") errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  if (name) {
    typeof name !== "string"
      ? errorMessage.push(ERROR_MSGS.INVALID_INPUT)
      : null;
  }
  console.log(Boolean(dayOfWeek));
  if (dayOfWeek) {
    !typeof Number(dayOfWeek)
      ? errorMessage.push(ERROR_MSGS.INVALID_INPUT)
      : null;
    Number(dayOfWeek) > 6 ? errorMessage.push(ERROR_MSGS.INVALID_INPUT) : null;
    Number(dayOfWeek) < 0 ? errorMessage.push(ERROR_MSGS.INVALID_INPUT) : null;
  }
  const data = await knex("workout").select("*").where({ id: workoutid });
  if (data.length <= 0) errorMessage.push(ERROR_MSGS.NOT_FOUND);

  if (errorMessage.length > 0) {
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    console.log(errorMessage);
    return;
  } else {
    next();
    return;
  }
};

const validatePutUser = async (req, res, next) => {
  const { userid } = req.params;
  const { firstName, lastName, password, height, weight } = req.body;
  const isRequestValid = [firstName, lastName, password, height, weight].some(
    (value) => value !== undefined
  );
  const errorMessage = [];

  if (!isRequestValid) errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  if (firstName === "") errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  if (firstName) {
    typeof firstName !== "string"
      ? errorMessage.push(ERROR_MSGS.INVALID_INPUT)
      : null;
  }
  if (lastName === "") errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  if (lastName) {
    typeof lastName !== "string"
      ? errorMessage.push(ERROR_MSGS.INVALID_INPUT)
      : null;
  }
  if (password === "") errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  if (height) {
    !Number(height) ? errorMessage.push(ERROR_MSGS.INVALID_INPUT) : null;
  }
  if (weight) {
    !Number(weight) ? errorMessage.push(ERROR_MSGS.INVALID_INPUT) : null;
  }
  const data = await knex("user").select("*").where({ id: userid });
  if (data.length <= 0) errorMessage.push(ERROR_MSGS.NOT_FOUND);

  if (errorMessage.length > 0) {
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    console.log(errorMessage);
    return;
  } else {
    next();
    return;
  }
};

module.exports = {
  verifyToken,
  validatePostUser,
  validatePutExercise,
  validatePutWorkout,
  validatePutUser,
};
