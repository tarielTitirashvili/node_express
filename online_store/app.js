const express = require('express');
const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
require("dotenv").config();

const port = process.env.PORT || 3000

const app = express();

//parse json
app.use(express.json())

//error middleware
app.use(errorMiddleware)
//not found middleware
app.use(notFoundMiddleware)

app.get('/', (req, res)=>{
  res.send(`<h1>store API</h1>`)
})

const start = () => {
  try {
    app.listen(port, () => console.log(`server is listening on ${port}...`));
  }catch(e){
    console.log(e)
  }
}

start()