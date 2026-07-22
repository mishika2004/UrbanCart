const express = require("express");
const cors = require("cors");
require("dotenv").config();

const initializeDatabase = require("./db/db.connect");
const Product = require("./models/products.models");
const Cart = require("./models/cart.models");
const Wishlist = require("./models/wishlist.models");
const Address = require("./models/address.models");
const Order = require("./models/order.models");
const products = require("./data/products");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true, optionSuccessStatus: 200 }));

/* ------------------------------------------
   SEED
------------------------------------------ */
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully");
  } catch (error) {
    console.log("Seeding failed", error);
  }
};
// seedProducts(); // uncomment once to seed

/* ------------------------------------------
   PRODUCTS
------------------------------------------ */

// GET all products  (supports ?search=, ?category=, ?rating=, ?sort=)
app.get("/api/products", async (req, res) => {
  try {
    const { search, category, rating, sort } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (rating)   filter.rating   = { $gte: Number(rating) };
    if (search)   filter.name     = { $regex: search, $options: "i" };

    let query = Product.find(filter);

    if (sort === "low")  query = query.sort({ price:  1 });
    if (sort === "high") query = query.sort({ price: -1 });

    const data = await query;
    res.json({ data: { products: data } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

// GET single product
app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ data: { product } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
});

// POST add product (admin)
app.post("/api/products/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved   = await product.save();
    res.status(201).json({ message: "Product added successfully", product: saved });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
});

/* ------------------------------------------
   CATEGORIES
------------------------------------------ */

// GET all categories (distinct values from products)
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const formatted  = categories.map((c) => ({ _id: c, name: c }));
    res.json({ data: { categories: formatted } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
});

// GET products by category id (category name)
app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.json({ data: { category: req.params.categoryId, products } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category", error: error.message });
  }
});

/* ------------------------------------------
   CART
------------------------------------------ */

// GET cart for user
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
    if (!cart) return res.json({ data: { cart: { products: [] } } });
    res.json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
});

// POST add to cart
app.post("/api/cart/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [] });

    const item = cart.products.find((p) => p.productId.toString() === productId);
    if (item) {
      item.quantity += 1;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    await cart.save();
    const populated = await cart.populate("products.productId");
    res.json({ message: "Added to cart", data: { cart: populated } });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
});

// PUT increase quantity
app.put("/api/cart/increase", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find((p) => p.productId.toString() === productId);
    if (item) item.quantity += 1;

    await cart.save();
    const populated = await cart.populate("products.productId");
    res.json({ data: { cart: populated } });
  } catch (error) {
    res.status(500).json({ message: "Failed to increase quantity", error: error.message });
  }
});

// PUT decrease quantity
app.put("/api/cart/decrease", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find((p) => p.productId.toString() === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
      }
    }

    await cart.save();
    const populated = await cart.populate("products.productId");
    res.json({ data: { cart: populated } });
  } catch (error) {
    res.status(500).json({ message: "Failed to decrease quantity", error: error.message });
  }
});

// DELETE remove from cart
app.delete("/api/cart/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
    await cart.save();
    const populated = await cart.populate("products.productId");
    res.json({ message: "Removed from cart", data: { cart: populated } });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from cart", error: error.message });
  }
});

// DELETE clear cart
app.delete("/api/cart/clear/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.products = [];
    await cart.save();
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error: error.message });
  }
});

/* ------------------------------------------
   WISHLIST
------------------------------------------ */

// GET wishlist for user
app.get("/api/wishlist/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate("products");
    if (!wishlist) return res.json({ data: { wishlist: { products: [] } } });
    res.json({ data: { wishlist } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error: error.message });
  }
});

// POST add to wishlist
app.post("/api/wishlist/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) wishlist = new Wishlist({ userId, products: [] });

    const already = wishlist.products.map((p) => p.toString()).includes(productId);
    if (!already) wishlist.products.push(productId);

    await wishlist.save();
    const populated = await wishlist.populate("products");
    res.json({ message: "Added to wishlist", data: { wishlist: populated } });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to wishlist", error: error.message });
  }
});

// DELETE remove from wishlist
app.delete("/api/wishlist/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
    await wishlist.save();
    const populated = await wishlist.populate("products");
    res.json({ message: "Removed from wishlist", data: { wishlist: populated } });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from wishlist", error: error.message });
  }
});

/* ------------------------------------------
   ADDRESS
------------------------------------------ */

// GET all addresses for user
app.get("/api/addresses/:userId", async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.json({ data: { addresses } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses", error: error.message });
  }
});

// POST add address
app.post("/api/addresses/add", async (req, res) => {
  try {
    const address = new Address(req.body);
    const saved   = await address.save();
    res.status(201).json({ message: "Address added", data: { address: saved } });
  } catch (error) {
    res.status(500).json({ message: "Failed to add address", error: error.message });
  }
});

// PUT update address
app.put("/api/addresses/:addressId", async (req, res) => {
  try {
    const updated = await Address.findByIdAndUpdate(req.params.addressId, req.body, { new: true });
    res.json({ message: "Address updated", data: { address: updated } });
  } catch (error) {
    res.status(500).json({ message: "Failed to update address", error: error.message });
  }
});

// DELETE address
app.delete("/api/addresses/:addressId", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.addressId);
    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address", error: error.message });
  }
});

/* ------------------------------------------
   ORDERS
------------------------------------------ */

// GET all orders for user
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("products.productId")
      .sort({ createdAt: -1 });
    res.json({ data: { orders } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// POST place order
app.post("/api/orders/place", async (req, res) => {
  try {
    const { userId, products, address, totalAmount } = req.body;
    const order = new Order({ userId, products, address, totalAmount });
    const saved = await order.save();

    // Clear cart after order placed
    const cart = await Cart.findOne({ userId });
    if (cart) { cart.products = []; await cart.save(); }

    res.status(201).json({ message: "Order placed successfully!", data: { order: saved } });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
});

const { handleSupportChat } = require("./ai/supportAgent");
const { handleRecommendChat } = require("./ai/recommendAgent");
const { similarProducts } = require("./ai/tools");

// POST /api/ai/support-chat
app.post("/api/ai/support-chat", async (req, res) => {
  try {
    const { message, orderId, conversationHistory } = req.body;
    const response = await handleSupportChat(message, orderId, conversationHistory || []);
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ message: "AI Error", error: error.message });
  }
});

// POST /api/ai/recommend-chat
app.post("/api/ai/recommend-chat", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    const response = await handleRecommendChat(message, conversationHistory || []);
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ message: "AI Error", error: error.message });
  }
});

// GET /api/ai/similar-products/:id
app.get("/api/ai/similar-products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === 'undefined') return res.json({ data: { products: [] } }); 
    const products = await similarProducts(id, 4);
    res.json({ data: { products } });
  } catch (error) {
    res.status(500).json({ message: "AI Error", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to initialize backend.", error);
    process.exit(1);
  }
};

startServer();
 
 
