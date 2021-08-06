import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    idStore: {
        type: String,
        required: true,
    },
    registrationDateProduct: {
        type: Date,
        required: true,
    },
    availabilityProduct: {
        type: Number,
        required: true,
    },
    priceProduct: {
        type: Number,
        required: true,
    },
    imageProduct: {
        type: String,
        required: true,
    },
    descriptionProduct: {
        type: String,
        required: true,
    },
    categoryProduct: {
        type: String,
        required: true,
    },
    itSold: {
        type: Boolean,
    }
});

const ProductsModel = mongoose.model('Products', Schema);

export default ProductsModel;
