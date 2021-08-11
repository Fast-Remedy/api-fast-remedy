import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    cnpjStore: {
        type: String,
        required: true,
        unique: true,
    },
    emailStore: {
        type: String,
        required: true,
        unique: true,
    },
    passwordStore: {
        type: String,
        required: true,
        select: false,
    },
    companyNameStore: {
        type: String,
        required: true,
    },
    tradingNameStore: {
        type: String,
        required: true,
    },
    phoneStore: {
        type: String,
        required: true,
    },
    deliveryFeeStore: {
        type: Number,
        required: true,
    },
    deliveryEstimatedTimeStore: {
        type: Date,
        required: true,
    },
    registrationDateStore: {
        type: Date,
        required: true,
    },
});

const StoresModel = mongoose.model('Stores', Schema);

export default StoresModel;
