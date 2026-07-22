const mongoose = require('mongoose');
require('dotenv').config();
const mongoUrl = process.env.MONGODB;
const initializeDatabase = async () => {
    if (!mongoUrl) {
        throw new Error("MONGODB is not configured. Add it to Backend/.env before starting the server.");
    }

    await mongoose.connect(mongoUrl);
    console.log("Connected successfully!");
};
module.exports = initializeDatabase;