const express = require("express");
const { people } = require("../data");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, data: people });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  if (name) {
    people.push({ name, id: people.length });
    return res.status(201).json({ success: true, person: name });
  }
  res.status(400).json({ success: false, msg: "name is required" });
});

router.put("/:id", (req, res) => {
  const id = +req?.params?.id;
  const { name } = req.body;
  const exists = people.find((human) => human.id === id);
  if (exists) {
    for (let i = 0; i < people.length; i) {
      if (people[i].id === +id) {
        people[i].name = name;
        res.status(200).json({ success: true, msg: "updated person " + name });
      }
    }
  } else res.status(404).json({ success: false, msg: "couldn't find person" });
});

router.delete("/:id", (req, res) => {
  const id = +req?.params?.id;
  const exists = people.find((human) => human.id === id);
  if (exists) {
    people = people.filter((human) => human.id !== id);
    res.status(200).json({ success: true, people: people });
  } else res.status(404).json({ success: false, msg: "couldn't find person" });
});

module.exports = router