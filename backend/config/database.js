const mongoose = require("mongoose");

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/saludya";
    await mongoose.connect(uri);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando MongoDB:", error.message);
  }
}

module.exports = connectDB;
