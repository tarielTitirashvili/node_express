const Task = require("../models/task");
// const { basicTryCatcher } = require('../utils/controllerHalperFunctions')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  };
};

const getTask = (req, res) => {
  const { id } = req.params;
  res.send("get single task " + id);
};

const createTask = async (req, res) => {
  try {
    if (req.body?.name) {
      const createTask = await Task.create(req.body);
      res.status(201).json({ createTask });
    } else {
      res.status(400).message("bad request");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  };
};

const updateTask = (req, res) => {
  res.send("update old task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
