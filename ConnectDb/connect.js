const mongoose = require("mongoose");

const connectdb = () => {
  mongoose.connect(process.env.MONGO_URL);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log("connected successfully");
  });
};

module.exports = connectdb;
