import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    idStore: String,
    stateStore: String,
    cityStore: String,
    neighborhoodStore: String,
    complementStore: String,
    streetNumberStore: String,
    postalCodeStore: String,

});

const AddressStoresModel = mongoose.model('AddressStores', Schema);

export default AddressStoresModel;
