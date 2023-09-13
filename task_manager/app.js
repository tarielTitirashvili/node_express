const express = require("express");
const { tasksRoutes } = require("./routes/tasks");
const connectionToDB = require("./db/connection");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasksRoutes);

// 404 not found middleware
app.use(notFound);
// error handler middleware
app.use(errorHandler);

const start = async () => {
  try {
    await connectionToDB(process.env.MONGO_CONNECTION_URI);
    app.listen(PORT, () => console.log(`server is listening on ${PORT}...`));
  } catch (err) {
    console.log(err);
  };
};

start();
