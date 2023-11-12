const Job = require("../models/Job");
const Errors = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt');
  res.status(StatusCodes.OK).json({jobs, count: jobs.length});
};

const getJob = async (req, res) => {
  const job = await Job.find({createdBy: req.user.userId, _id: req.params.id}).sort('createdAt');
  if(!job){
    throw new Errors.NotFoundError('job not found');
  }
  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  const { body, user } = req;
  if (!body.company || !body.position || !body.status) {
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
