require('dotenv').config({ path: 'e:/far/.env.local' });
const mongoose = require('mongoose');

async function test() {
  console.log("Connecting to:", process.env.MONGODB_URI);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully!");
    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({ email: String }));
    const count = await User.countDocuments();
    console.log("User count:", count);
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

test();
