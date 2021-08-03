import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    registrationDateDeliveryMan: Date,
    availabilityDeliveryMan: Boolean,
    phoneDeliveryMan: String,
    nameDeliveryMan: String,
    passwordDeliveryMan: String,
    emailDeliveryMan: String,
    cpfDeliveryMan: String,
});

const DeliveryMenModel = mongoose.model('DeliveryMen', Schema);

export default DeliveryMenModel;
