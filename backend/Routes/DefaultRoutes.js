const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const corsOption = {
  origin: process.env.FE_URL,
  optionsSuccessStatus: 200,
};

router.use("/", cors(corsOption), (req, res, next) => {
  console.log("Time: ", new Date());
  next();
});
router.get("/", (req, res) => {
  res.redirect("https://www.google.com");
});
module.exports = router;
