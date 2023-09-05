const express = require("express");
// const { people } = require("../data");
const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

const router = express.Router();
// one way for setting up the routes
// router.get("/", getPeople);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

// second way for setting up the routes
router.route('/').get(getPeople).post(createPerson);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
