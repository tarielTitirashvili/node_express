const Job = require("../models/Job");
const Errors = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getJobs = (req, res) => {
  res.send("getJobs!");
};

const getJob = (req, res) => {
  res.send(req.user);
};

const createJob = async (req, res) => {
  const { body, user } = req;
  if (!body.company || !body.position || !body.status || !user.userId) {
    throw new Errors.BadRequestError(
      "bad request required value was not provided!"
    );
  };
  body.createdBy = user.userId;
  const newJob = await Job.create(body);
  res.status(StatusCodes.CREATED).json(newJob);
};

const updateJob = (req, res) => {
  res.send("updateJob!");
};

const deleteJob = (req, res) => {
  res.send("deleteJob!");
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
