import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    registrationDateCustomer: String,
    phoneCustomer: String,
    nameCustomer: String,
    passwordCustomer: String,
    emailCustomer: String,
    cpfCustomer: Date,
});

const CustomersModel = mongoose.model('Customers', Schema);

export default CustomersModel;

