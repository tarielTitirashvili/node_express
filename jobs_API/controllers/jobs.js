const getJobs = (req, res) => {
  res.send("getJobs!");
};

const getJob = (req, res) => {
  res.send(req.user);
};

const createJob = (req, res) => {
  res.send("createJob!");
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
