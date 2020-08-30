require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log(`MongoDB connect on localhost:${process.env.PORT}`);
  }
);

module.exports = mongoose;