const mongoose = require('mongoose');

// Using the URI from .env.local
const MONGODB_URI = "mongodb+srv://temp_123:temp_123@cluster0.r1jdie4.mongodb.net/?appName=Cluster0";

async function test() {
  console.log("Connecting to:", MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected successfully!");
    const count = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", count.map(c => c.name));
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

test();
