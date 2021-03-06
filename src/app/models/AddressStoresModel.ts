import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	streetNameStore: {
		type: String,
		required: true,
	},
	streetNumberStore: {
		type: String,
		required: true,
	},
	complementStore: {
		type: String,
		required: false,
	},
	neighborhoodStore: {
		type: String,
		required: true,
	},
	cityStore: {
		type: String,
		required: true,
	},
	stateStore: {
		type: String,
		required: true,
	},
	idStore: {
		type: String,
		required: true,
	},
});

const AddressStoresModel = mongoose.model('AddressStores', Schema);

export default AddressStoresModel;
