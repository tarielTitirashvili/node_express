const getAllTasks = (req, res) =>{
    res.send('all items from file');
};

const getTask = (req, res) =>{
  const { id } = req.params
  res.send('get single task ' + id)
}

const createTask = (req, res) =>{
  res.json(req.body);
};

const updateTask = (req, res) =>{
  res.send('create new task');
};

const deleteTask = (req, res) =>{
  res.send('delete task');
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};