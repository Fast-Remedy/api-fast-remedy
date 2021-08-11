import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    registrationDateDeliveryMan: {
        type: Date,
        required: true,
    },
    availabilityDeliveryMan: {
        type: Boolean,
        required: true,
    },
    phoneDeliveryMan: {
        type: String,
        required: true,
    },
    nameDeliveryMan: {
        type: String,
        required: true,
    },
    passwordDeliveryMan: {
        type: String,
        required: true,
        select: false,
    },
    emailDeliveryMan: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    cpfDeliveryMan: {
        type: String,
        required: true,
        unique: true,
    },
});

const DeliveryMenModel = mongoose.model('DeliveryMen', Schema);

export default DeliveryMenModel;
