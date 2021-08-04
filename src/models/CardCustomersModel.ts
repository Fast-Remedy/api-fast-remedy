import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    idCustomer: String,
    mainCardCustomer: Boolean,
    cardOwnerCpfCustomer: String,
    cardOwnerNameCustomer: String,
    cardCvvCustomer: String,
    cardExpirationDateCustomers: String,
    cardNumberCustomers: String,
    cardTypeCustomers: String,
});

const CardCustomersModel = mongoose.model('CardCustomers', Schema);

export default CardCustomersModel;
