const express = require("express");
const router = express.Router();
const _ = require("lodash");

const auth = require("../middlewares/auth");
const { validate, Interests } = require("../models/interests");

router.get("/", async (req, res) => {
  try {
    const result = await Interests.find({}, "-_id");
    if (!result) return res.status(404).send("No interest/s found!");

    return res.send(result);
  } catch (error) {
    return res.status(400).send(`An error occurred while fetching interests! ${error}`);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`An error occurred while creating interest! ${error}`);

  try {
    const result = await Interests.create(req.body);
    return res.send(_.pick(result, ['icon', 'title']));
  } catch (error) {
    return res.status(400).send(`An error occurred while creating interest! ${error}`);
  }
});

module.exports = router;
