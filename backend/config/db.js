mongoose = require("mongoose");
const URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const connectDB = async () => {
  const conn = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  console.log(`connected to : ${conn.connection.host}`);
};

module.exports = connectDB;
