const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Admin } = require("../models/admins");

router.post("/", async (req, res) => {
  //validate request
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Email or password incorrect!");

  try {
    //check user existence
    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send("Email or password incorrect!");

    const result = await bcrypt.compare(req.body.password, admin.password);
    if (!result) return res.status(400).send("Email or password incorrect!");

    const token = admin.generateAuthToken();
    res.header("x-auth-token", token).send("Login complete!");
  } catch ({ message }) {
    console.log("Error logging in!", message);
    return res
      .status(400)
      .send(`Unknown error occured, please try again later!`);
  }
});

function validate(request) {
  const schema = Joi.object({
    email: Joi.string().email().trim().min(1).max(255).required(),
    password: Joi.string().min(1).max(1024).required(),
  });
  return schema.validate(request);
}

module.exports = router;
