const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 255,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 255,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1024,
    },
  },
  { versionKey: false }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, config.get("WEB_TOKEN_SECRET"));
};

const Admin = mongoose.model("admins", userSchema);

function validate(admin) {
  const schema = Joi.object({
    email: Joi.string().email().trim().min(1).max(255).required(),
    name: Joi.string().trim().min(1).max(255).required(),
    password: Joi.string().min(1).max(1024).required(),
  });
  return schema.validate(admin);
}

module.exports.Admin = Admin;
module.exports.validate = validate;
