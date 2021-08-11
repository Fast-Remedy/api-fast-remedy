import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    registrationDateCustomer: {
        type: Date,
        required: true,
    },
    phoneCustomer: {
        type: String,
        required: true,
        unique: true
    },
    nameCustomer: {
        type: String,
        required: true,
    },
    passwordCustomer: {
        type: String,
        required: true,
        select: false
    },
    emailCustomer: {
        type: String,
        unique: true,
        lowercase: true,
    },
    cpfCustomer: {
        type: String,
        required: true,
        unique: true,
    }
});

const CustomersModel = mongoose.model('Customers', Schema);

export default CustomersModel;

