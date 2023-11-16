const mongoose = require("mongoose");
const Joi = require("joi");

const matchDetails = mongoose.model(
  "match_details",
  new mongoose.Schema(
    {
      user: {
        type: String,
        required: true,
        unique: true,
        ref: "users",
      },
      birthday: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["male", "female", "other"],
      },
      preference: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["male", "female", "other"],
      },
      age_preference: {
        type: Object,
        required: true,
        validator: function (v) {
          const length = v && v.length === 2;
          const from =
            v["from"] &&
            typeof v["from"] === "number" &&
            v["from"] > 17 &&
            v["from"] < 66;
          const to =
            v["to"] &&
            typeof v["to"] === "number" &&
            v["to"] > 17 &&
            v["to"] < 66;

          return length && from && to;
        },
      },
      personality: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["introvert", "extrovert"],
      },
      location: {
        type: Object,
        required: true,
        validator: function (v) {
          const length = v && v.length === 3;
          const suburb =
            v["suburb"] &&
            typeof v["suburb"] === "string" &&
            v["suburb"].length;
          const city =
            v["city"] && typeof v["city"] === "string" && v["city"].length;
          const state =
            v["state"] && typeof v["state"] === "string" && v["state"].length;
          const longitude = v["longitude"];
          const latitude = v["latitude"];
          return length && suburb && city && state && longitude && latitude;
        },
      },
      interests: {
        type: [String],
        required: true,
        validator: function (v) {
          return v && v.length;
        },
      },
    },
    { versionKey: false }
  )
);

function validate(matchDetails) {
  const schema = Joi.object({
    birthday: Joi.date().required(),
    gender: Joi.string().lowercase().required(),
    preference: Joi.string().lowercase().required(),
    age_preference: Joi.object({
      from: Joi.number().min(17).max(66).required(),
      to: Joi.number().min(17).max(66).required(),
    })
      .required()
      .length(2),
    personality: Joi.string().lowercase().required(),
    location: Joi.object({
      suburb: Joi.string().trim().min(1).max(50).required(),
      city: Joi.string().trim().min(1).max(50).required(),
      state: Joi.string().trim().min(1).max(50).required(),
      longitude: Joi.number().required(),
      latitude: Joi.number().required(),
    })
      .required()
      .length(5),
    interests: Joi.array().min(1).items(Joi.string()).required(),
  }).length(7);
  return schema.validate(matchDetails);
}

module.exports.matchDetails = matchDetails;
module.exports.validate = validate;
