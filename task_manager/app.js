const express = require("express");
const { tasksRoutes } = require("./routes/tasks");
const connectionToDB = require("./db/connection");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasksRoutes);

const start = async () => {
  try {
    await connectionToDB(process.env.MONGO_CONNECTION_URI);
    app.listen(PORT, () => console.log(`server is listening on ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
