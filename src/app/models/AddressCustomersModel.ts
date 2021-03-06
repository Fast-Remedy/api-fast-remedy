import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	streetNameCustomer: {
		type: String,
		required: true,
	},
	streetNumberCustomer: {
		type: String,
		required: true,
	},
	complementCustomer: {
		type: String,
		required: false,
	},
	neighborhoodCustomer: {
		type: String,
		required: true,
	},
	cityCustomer: {
		type: String,
		required: true,
	},
	stateCustomer: {
		type: String,
		required: true,
	},
	mainAddressCustomer: {
		type: Boolean,
		required: true,
	},
	idCustomer: {
		type: String,
		required: true,
	},
});

const AddressCustomersModel = mongoose.model('AddressCustomers', Schema);

export default AddressCustomersModel;
