const Task = require("../models/task");
const { checkTaskExistence } = require("../utils/controllerHelperFunctions");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  checkTaskExistence(task, res);
});

const createTask = asyncWrapper(async (req, res) => {
  if (req.body?.name) {
    const createTask = await Task.create(req.body);
    res.status(201).json({ createTask });
  } else
    res.status(400).message("bad request");
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId })
  checkTaskExistence(task, res);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const body = req.body;
  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, body, { new: true, runValidators: true });
  checkTaskExistence(updatedTask, res);
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
