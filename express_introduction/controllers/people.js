const { people } = require("../data");

const getPeople = (req, res) => {
  res.json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (name) {
    people.push({ name, id: people.length });
    return res.status(201).json({ success: true, person: name });
  }
  res.status(400).json({ success: false, msg: "name is required" });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const id = +req?.params?.id;
  const exists = people.find((human) => human.id === id);
  if (exists) {
    people = people.filter((human) => human.id !== id);
    res.status(200).json({ success: true, people: people });
  } else res.status(404).json({ success: false, msg: "couldn't find person" });
};

module.exports = {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
};
