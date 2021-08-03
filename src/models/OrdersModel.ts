import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    idCustomer: String,
    idStore: String,
    idDeliveryMan: String,
    idProduct: String,
    dateOrder: Date,
    statusOrder: String,
    totalOrder: Number,
    subTotalOrder: Number,
    deliveryEstimatedOrder: Number,
    deliveryFeeOrder: Number,
});

const OrdersModel = mongoose.model('Orders', Schema);

export default OrdersModel;
