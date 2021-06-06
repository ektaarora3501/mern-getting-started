const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: ["true", "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    require: [true, "Please enter a valid password"],
    minlength: [6, "Password must be atleast 6 characters long"],
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
