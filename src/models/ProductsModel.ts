import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    idStore: String,
    registrationDateProduct: Date,
    availabilityProduct: Number,
    priceProduct: Number,
    imageProduct: String,
    descriptionProduct: String,
    categoryProduct: String,
});

const ProductsModel = mongoose.model('Products', Schema);

export default ProductsModel;
