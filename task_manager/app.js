const express = require('express');
const { tasksRoutes } = require('./routes/tasks');
require('./connection/db')

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasksRoutes);

app.listen(PORT, () => console.log(`server is listening on ${PORT}...`));