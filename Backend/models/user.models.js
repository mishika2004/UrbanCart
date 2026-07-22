// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: integer,
//   address: String
// });

// module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true, unique: true },
  phone:   { type: Number },
  address: { type: String },
  avatar:  { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
