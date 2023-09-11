const checkTaskExistence = (task, res) => {
  if (task === null)
    res.status(404).json({ msg: 'Task not found' });
  else
    res.status(200).json({ task });
};

module.exports = {
  checkTaskExistence
};