const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/yashwant'sDB")
  .then(() => {
    console.log("Connected successfully to database");
  })
  .catch(() => {
    console.log("Failed to connect to database");
  });

const signUpSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  city: [{
    type: String,
  }],
  level: [{
    type: String,
  }],
});

const Collection1 = mongoose.model("Collection1", signUpSchema);
module.exports = { Collection1};