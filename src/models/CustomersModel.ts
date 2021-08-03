import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    registrationDateCustomer: Date,
    phoneCustomer: String,
    nameCustomer: String,
    passwordCustomer: String,
    emailCustomer: {
        type: String,
        unique: true
    },
    cpfCustomer: String,
});

const CustomersModel = mongoose.model('Customers', Schema);

export default CustomersModel;

