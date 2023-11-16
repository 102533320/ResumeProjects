const express = require("express");
const Joi = require("joi");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");

const auth = require("../middlewares/auth");
const { User, validate: validateUser } = require("../models/users.js");
const {
  matchDetails,
  validate: validateDetails,
} = require("../models/matchDetails.js");

router.get("/", async (req, res) => {
  if (!req.query.id)
    return res.status(418).send("You must provide an id query!");

  const { error } = validateId({ id: req.query.id });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await User.findById(req.query.id);

    if (!result["active"]) return res.status(404).send("User not found!");

    console.log(result);
    res.send(
      _.pick(result, ["_id", "first_name", "last_name", "email", "photos"])
    );
  } catch ({ message }) {
    console.log("Error finding user by id!", message);
    return res.status(404).send(`Error finding user by id! ${message}`);
  }
});

router.post("/", async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userErr = validateUser(req.body["user"]).error;
  if (userErr) return res.status(400).send(userErr.details[0].message);
  const detailsErr = validateDetails(req.body["match_details"]).error;
  if (detailsErr) return res.status(400).send(detailsErr.details[0].message);

  req.body.match_details["user"] = req.body.user["_id"];

  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session, new: true };

  try {
    const user = await User.create([req.body.user], opts);
    const details = await matchDetails.create([req.body.match_details], opts);
    session.commitTransaction().then(() => {
      session.endSession();
    });

    console.log({ user, details });
    res.send({ user, details });
  } catch ({ message }) {
    session.abortTransaction().then(() => {
      session.endSession();
    });
    console.log("Error creating new user!", message);
    return res.status(400).send(`Error creating new user! ${message}`);
  }
});

router.delete("/", auth, async (req, res) => {
  if (!req.query.id)
    return res.status(418).send("You must provide an id query!");

  const result = await User.findById(req.query.id);
  if (!result || !result["active"])
    return res.status(404).send("User not found!");

  result.active = false;
  result.save();

  res.send(result);
});

router.put("/", async (req, res) => {
  if (!req.query.id)
    return res.status(418).send("You must provide an id query!");

  const result = await User.findById(req.query.id);
  if (!result || !result["active"])
    return res.status(404).send("User not found!");

  result.set(req.body);

  result.save();
  console.log(result);
  res.send(result);
});

function validateId(id) {
  const schema = Joi.object({
    id: Joi.string()
      .regex(
        RegExp("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$")
      )
      .message("Id does not match the correct pattern!"),
  });

  return schema.validate(id);
}
function validatePost(object) {
  const schema = Joi.object({
    user: Joi.object().required(),
    match_details: Joi.object().required(),
  }).length(2);

  return schema.validate(object);
}

module.exports = router;
