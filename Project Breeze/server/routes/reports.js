const c = require("config");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const _ = require("lodash");
const { User } = require("../models/users.js");

router.put("/", async (req, res) => {
  //validate request
  const { error: errorId } = validateId({ id: req.query.id });
  if (errorId) return res.status(400).send(`An error occurred! ${errorId}`);
  const { error: errorReport } = validateReport(req.body);
  if (errorReport)
    return res.status(400).send(`An error occurred! ${errorReport}`);
  try {
    const currentUser = await User.findById(req.query.id);
    const updateUser = new User(currentUser);

    const currentReports = updateUser.reports;
    const newReports = req.body.reports.map((v) => ({ message: v, count: 1 }));
    let mergeReports = [...currentReports, ...newReports];
    mergeReports.sort(sortReports);

    mergeReports = filterDuplicateReport(mergeReports);

    updateUser.reports = mergeReports;

    const result = await updateUser.save();
    res.send(_.pick(result,["first_name", "last_name", "reports"]));
  } catch (error) {
    res.status(404).send(`An error occured! ${error}`);
  }
});

function validateReport(report) {
  const schema = Joi.object({
    reports: Joi.array().items(Joi.string().required()).min(1),
  });
  console.log(report);
  return schema.validate(report);
}

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

function sortReports(a, b) {
  return a.message.localeCompare(b.message);
}

const filterDuplicateReport = (sortedArray) => {
  if (sortedArray.length > 1) {
    let current = 0;
    for (let i = 1; i < sortedArray.length; i++) {
      if (sortedArray[i].message === sortedArray[current].message) {
        sortedArray[current].count++;
        sortedArray[i].count = 0;
      } else {
        current = i;
      }
    }
  }
  return sortedArray.filter((v) => v.count > 0);
};

module.exports = router;
