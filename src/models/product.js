const mongoose = require('mongoose');
const { Schema, model, Mixed, Types } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: Number,
    brand: String,
    dateOfPurchase: Date,
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'usuarios'
    },
    features: {
        type: Mixed
    }
});

const Product = model('produtos', productSchema);

module.exports = Product