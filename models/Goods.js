const mongoose = require("mongoose");
const goodsSchema = new mongoose.Schema({
  _id: String,
  tenSanPham: String,
  img: String,
  loai: String,
  price: String,
});

module.exports = mongoose.model("goods", goodsSchema);