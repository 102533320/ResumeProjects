const auth = require("../middlewares/auth");
const express = require("express");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Admin, validate } = require("../models/admins");

router.get("/me", auth, async (req, res) => {
  const result = await Admin.findById(req.admin._id).select("-password");
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Admin.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Account already registered!");

  try {
    const admin = new Admin(_.pick(req.body, ["email", "name", "password"]));
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    const result = await admin.save();

    console.log(_.pick(result, ["email", "name"]));

    const token = admin.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(result, ["email", "name"]));

    res;
  } catch ({ message }) {
    console.log("Error creating admin account!", message);
    return res.status(400).send(`Error creating admin account! ${message}`);
  }
});

module.exports = router;
