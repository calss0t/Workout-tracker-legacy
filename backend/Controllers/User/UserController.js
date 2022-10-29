const express = require("express");
const { ERROR_MSGS } = require("../../Configs/Constants");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const knex = require("../../db/index");

const UserController = {
  getUser: async (req, res) => {
    try {
      const { userid } = req.params;
      console.log(userid);

      if (userid === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      }

      const data = await knex("user").select("*").where({ id: userid });
      console.log(data);

      if (data.length > 0) {
        res.status(200).json(data[0]);
        return;
      }
      res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      if (email === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      }

      const data = await knex
        .select("*")
        .from("user")
        .where({ email: email, password: password });
      console.log(data);

      if (data.length > 0) {
        const token = jwt.sign(
          {
            firstName: data[0]["first_name"],
            lastName: data[0]["last_name"],
            userid: data[0]["id"],
          },
          process.env.JWT_SECRET || "my_secret",
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ token: token, userid: data[0]["id"] });
        return;
      }
      res.status(401).json({ error: ERROR_MSGS.VALIDATION_ERROR });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  signup: async (req, res) => {
    try {
      const { email, password, firstName, lastName, height, weight } = req.body;
      console.log(email, password, firstName, lastName, height, weight);
      const newUser = [
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          height: height,
          weight: weight,
        },
      ];
      const data = await knex("user").returning(["id"]).insert(newUser);
      console.log(data);

      const token = jwt.sign(
        { firstName: firstName, lastName: lastName, userid: data[0]["id"] },
        process.env.JWT_SECRET || "my_secret",
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({ token: token, userid: data[0]["id"] });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  putUser: async (req, res) => {
    try {
      const { userid } = req.params;
      const { firstName, lastName, email, password, height, weight } = req.body;
      console.log(userid);

      if (userid === undefined) {
        res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
        return;
      }

      const data = await knex("user")
        .where({ id: userid })
        .update({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          height: height,
          weight: weight,
        })
        .returning("*");
      console.log(data);

      if (data.length > 0) {
        res.status(200).json(data[0]);
        return;
      }
      res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = UserController;
