const mongoose = require("mongoose");
const Joi = require("joi");

const Interests = mongoose.model(
  "interests",
  new mongoose.Schema(
    {
      icon: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    { versionKey: false }
  )
);

function validate(interest) {
  const schema = Joi.object({
    icon: Joi.string().required(),
    title: Joi.string().required()
  }).length(2);

  return schema.validate(interest);
}

module.exports.Interests = Interests;
module.exports.validate = validate;