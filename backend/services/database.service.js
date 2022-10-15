const { MONGO_URI } = process.env;
const mongoose = require('mongoose');
exports.connect = () => {
  // Connecting to the database
  console.log(MONGO_URI);
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};