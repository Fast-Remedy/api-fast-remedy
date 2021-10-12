import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	idStore: {
		type: String,
		required: true,
	},
	registrationDateProduct: {
		type: String,
		required: true,
	},
	compositionProduct: {
		type: String,
		required: false,
	},
	availabilityProduct: {
		type: Boolean,
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
});

const ProductsModel = mongoose.model('Products', Schema);

export default ProductsModel;
