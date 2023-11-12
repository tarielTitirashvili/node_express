const Job = require("../models/Job");
const Errors = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const job = await Job.find({
    createdBy: req.user.userId,
    _id: req.params.id,
  }).sort("createdAt");
  if (!job) {
    throw new Errors.NotFoundError("job not found");
  }
  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  const { body, user } = req;
  if (!body.company || !body.position || !body.status) {
    throw new Errors.BadRequestError(
      "bad request required value was not provided!"
    );
  }
  body.createdBy = user.userId;
  const newJob = await Job.create(body);
  res.status(StatusCodes.CREATED).json(newJob);
};

const updateJob = async (req, res) => {
  const { body, user, params } = req;
  // validate request required params
  if (!body.company || !body.status || !body.position) {
    throw new Errors.BadRequestError(
      "required parameters or parameter is missing"
    );
  }
  //find job in DB and update it
  const updatedJob = await Job.findByIdAndUpdate(
    { _id: params.id, createdBy: user.userId },
    body,
    { new: true, runValidators: true }
  );
  //check if job was found and update
  if (!updatedJob) {
    throw new Errors.NotFoundError("job application was not found");
  }
  //return updated job
  res.status(StatusCodes.OK).json(updatedJob);
};

const deleteJob = async (req, res) => {
  const deletedJob = await Job.findByIdAndRemove({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if(!deletedJob){
    throw new Errors.BadRequestError('job was not found');
  }
  res.status(StatusCodes.OK).json(deletedJob);
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
