const express = require('express');
const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
require("dotenv").config();
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const port = process.env.PORT || 3000;

const app = express();

//parse json
app.use(express.json());

//routes
app.use('/api/v1/products', productsRouter);

//error middleware
app.use(errorMiddleware);

//not found middleware
app.use(notFoundMiddleware);

const start = async () => {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`server is listening on ${port}...`));
  }catch(e){
    console.log(e);
  };
};

start();