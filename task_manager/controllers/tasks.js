const Task = require("../models/task");
const { checkTaskExistence } = require("../utils/controllerHelperFunctions");
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

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    checkTaskExistence(task, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  };
};

const createTask = async (req, res) => {
  try {
    if (req.body?.name) {
      const createTask = await Task.create(req.body);
      res.status(201).json({ createTask });
    } else
      res.status(400).message("bad request");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  };
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId })
    checkTaskExistence(task, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  };
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const body = req.body;
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, body, { new: true, runValidators: true });
    checkTaskExistence(updatedTask, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  };
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
