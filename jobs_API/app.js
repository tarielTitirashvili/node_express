require("dotenv").config();
require("express-async-errors");
const authMiddleWare = require('./middleware/authentication')
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// extra packages
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authMiddleWare, jobRoutes);

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
