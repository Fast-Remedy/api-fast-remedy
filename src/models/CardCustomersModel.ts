import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    idCustomer: {
        type: String,
        required: true,
    },
    mainCardCustomer: {
        type: Boolean,
        required: true,
    },
    cardOwnerCpfCustomer: {
        type: String,
        required: true,
    },
    cardOwnerNameCustomer: {
        type: String,
        required: true,
    },
    cardCvvCustomer: {
        type: String,
        required: true,
    },
    cardExpirationDateCustomers: {
        type: String,
        required: true,
    },
    cardNumberCustomers: {
        type: String,
        required: true,
    },
    cardTypeCustomers: {
        type: String,
        required: true,
    },
});

const CardCustomersModel = mongoose.model('CardCustomers', Schema);

export default CardCustomersModel;
