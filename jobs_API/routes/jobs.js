const express = require("express");
const router = express.Router();

const jobsController = require("../controllers/jobs");

// / for create and get
router.route("/").get(jobsController.getJobs).post(jobsController.createJob);
// /:id for det single job update and delete
router
  .route("/:id")
  .get(jobsController.getJob)
  .put(jobsController.updateJob)
  .delete(jobsController.deleteJob);

module.exports = router;
