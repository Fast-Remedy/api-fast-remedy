import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    idStore: String,
    stateStore: String,
    cityStore: String,
    neighborhoodStore: String,
    complementStore: String,
    streetNumberStore: String,
    streetNameStore: String,
    postalCodeStore: String
});

const StoresModel = mongoose.model('Stores', Schema);

export default StoresModel;
