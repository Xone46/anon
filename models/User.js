const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim : true,
  },
  lastname: {
    type: String,
    required: true,
    trim : true,
  },
  adress: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim : true,
  },
  city: {
    type: String,
    required: true,
    trim : true,
  },
  email: {
    type: String,
    required: true,
    trim : true,
    unique : false,
  },
  password: {
    type: String,
    required: true,
    trim : true,
  },
  licence: {
    type: String,
    required: true,
  },
  old: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});
const User = mongoose.model("User", UserSchema);
module.exports = User;