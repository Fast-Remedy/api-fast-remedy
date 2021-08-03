import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    postalCodeCustomer: String,
    streetNameCustomer: String,
    streetNumberCustomer: String,
    complementCustomer: String,
    neighborhoodCustomer: String,
    cityCustomer: String,
    stateCustomer: String,
    mainAddressCustomer: Boolean,
    idCustomer: String

});

const AddressCustomersModel = mongoose.model('AddressCustomers', Schema);

export default AddressCustomersModel;
