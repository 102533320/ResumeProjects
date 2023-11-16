const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        match: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
      },
      first_name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
        trim: true,
      },
      last_name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
        trim: true,
      },
      email: { type: String, unique: true, sparse: true },
      phone_no: { type: String, unique: true, sparse: true },
      photos: {
        type: [String],
        required: true,
        validator: function (v) {
          return v && v.length;
        },
      },
      creation_date: {
        type: Date,
        default: Date.now,
      },
      active: { type: Boolean, default: false },
    },
    { versionKey: false }
  )
);

function validate(user) {
  const schema = Joi.object({
    _id: Joi.string()
      .regex(
        RegExp("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$")
      )
      .message("Id does not match the correct pattern!")
      .required(),
    first_name: Joi.string().trim().min(1).max(50).required(),
    last_name: Joi.string().trim().min(1).max(50).required(),
    email: Joi.string().email(),
    phone_no: Joi.string(),
    photos: Joi.array().min(1).items(Joi.string()).required(),
  })
    .xor("email", "phone_no")
    .length(5);
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validate;
