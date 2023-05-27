const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
    _idGoods: {
        type: String,
        required: true
    },
    tenSanPham: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sl: {
        type: Number,
        required: true
    }
});

const boughtsSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    user: {
        type: String,
        required: true
    },
    goods: [goodsSchema],
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('boughts', boughtsSchema);





