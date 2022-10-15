const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  uuid: { type: String, default: null },
  address: { type: String, default: null },
  name: { type: String, default: null },
  image: {type: String, default: null},
  price: {type: String, default: null},
  description: {type : String, default: null},
  quantity: {type : Number, default: null},
  mints: {type: Array, default: []}
});

module.exports = mongoose.model("contract", contractSchema);