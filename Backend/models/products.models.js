const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true,
    enum: ["men", "women", "electronics", "furniture", "kids", "home"]
  },

  rating: {
    type: Number,
    default: 0
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model("Product", productSchema);
