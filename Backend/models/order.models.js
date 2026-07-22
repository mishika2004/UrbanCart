const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity:  { type: Number, default: 1 },
      price:     { type: Number }
    }
  ],
  address:     { type: Object, required: true },
  totalAmount: { type: Number, required: true },
  status:      { type: String, default: "Order Placed" },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
