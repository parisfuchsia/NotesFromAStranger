const mongoose = require("mongoose");

const connectDb = async() => {
  await mongoose.connect(process.env.MONGOOSE_DB_URL);
}

module.exports = { connectDb }