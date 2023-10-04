require("dotenv").config();
const express = require("express");
const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");


const app = express();

app.listen(5000, () => console.log(`server is listening on 5000...`));