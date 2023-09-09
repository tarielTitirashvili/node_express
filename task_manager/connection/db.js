const mongoose = require("mongoose");
const CONNECTION_STRING = require("./");

// params needed because of my network
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log(`DB error: ${err}`));
