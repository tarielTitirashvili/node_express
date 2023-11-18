require("dotenv").config();
require("express-async-errors");
const authMiddleWare = require('./middleware/authentication')
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require('express-rate-limit');

const app = express();

app.set('trust proxy', 1)


app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	// standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
}));
app.use(helmet());
app.use(cors());

const connectDB = require("./db/connect");

// extra packages
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", authMiddleWare, jobRoutes);

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
