const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Note collection and schema
let User = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", User);
