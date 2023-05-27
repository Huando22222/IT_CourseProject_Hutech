const mongoose = require("mongoose");
const contentsSchema = new mongoose.Schema({
    _id: String,
    img: String,
    title: String,
    info: String,
});

module.exports = mongoose.model("contents", contentsSchema);