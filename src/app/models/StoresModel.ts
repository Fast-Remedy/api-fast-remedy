import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	cnpjStore: {
		type: String,
		required: true,
		unique: true,
	},
	emailStore: {
		type: String,
		required: true,
		unique: true,
	},
	passwordStore: {
		type: String,
		required: true,
		select: false,
	},
	companyNameStore: {
		type: String,
		required: true,
	},
	tradingNameStore: {
		type: String,
		required: true,
	},
	phoneStore: {
		type: String,
		required: true,
	},
	deliveryFeeStore: {
		type: Number,
		required: true,
	},
	deliveryEstimatedTimeStore: {
		type: Number,
		required: true,
	},
	registrationDateStore: {
		type: String,
		required: true,
	},
	imageStore: {
		type: String,
		required: true,
	},
	deliveryMode: {
		type: String,
		required: true,
	},
	bankNumber: {
		type: String,
		required: true,
	},
	agencyNumber: {
		type: String,
		required: true,
	},
	accountNumber: {
		type: String,
		required: true,
	},
	verifyingDigit: {
		type: String,
		required: true,
	},
});

const StoresModel = mongoose.model('Stores', Schema);

export default StoresModel;
