require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/products.models");
const products = require("../data/products");

const seedProducts = async () => {
  if (!process.env.MONGODB) {
    throw new Error("MONGODB is not configured. Add it to Backend/.env before seeding.");
  }

  await mongoose.connect(process.env.MONGODB);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products successfully.`);
  await mongoose.disconnect();
};

seedProducts()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error("Product seeding failed.", error);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    process.exit(1);
  });