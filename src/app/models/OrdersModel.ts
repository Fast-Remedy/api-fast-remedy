import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	idCustomer: {
		type: String,
		required: true,
	},
	idStore: {
		type: String,
		required: true,
	},
	idDeliveryMan: {
		type: String,
		required: false,
	},
	orderProducts: {
		type: Array,
		required: true,
	},
	paymentOrder: {
		type: Array,
		required: true,
	},
	addressCostumer: {
		type: Array,
		required: true,
	},
	addressStore: {
		type: Array,
		required: true,
	},
	dateOrder: {
		type: String,
		required: true,
	},
	statusOrder: {
		type: String,
		required: true,
	},
	totalOrder: {
		type: Number,
		required: true,
	},
	subTotalOrder: {
		type: Number,
		required: true,
	},
	deliveryEstimatedOrder: {
		type: Number,
		required: true,
	},
	deliveryFeeOrder: {
		type: Number,
		required: true,
	},
});

const OrdersModel = mongoose.model('Orders', Schema);

export default OrdersModel;
