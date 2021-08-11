import AddressStoresModel from '../models/AddressStoresModel';
import ProductsModel from '../models/ProductsModel';
import StoresModel from '../models/StoresModel';
import crypto from 'crypto';
import validate from '../utils/validate';
import sharp from 'sharp';
import generateToken from '../utils/generateToken';
import base64_encoded from "../utils/base64Encoded";

class CustomersController {
    static async createStores (req, res) {
        // @ts-ignore
        let { cnpjStore, emailStore, passwordStore, companyNameStore, tradingNameStore, phoneStore, deliveryFeeStore, deliveryEstimatedTimeStore, registrationDateStore } = req.body;

        const encryptedPassword = crypto.createHmac('sha512', `${process.env.ENCRYPT_KEY}`).update(passwordStore).digest('base64');

        await validate(req, res);

        try {
            await StoresModel.create({
                cnpjStore,
                emailStore,
                passwordStore: encryptedPassword,
                companyNameStore,
                tradingNameStore,
                phoneStore,
                deliveryFeeStore,
                deliveryEstimatedTimeStore,
                registrationDateStore
            });

            return res.json();
        } catch (error){
            // @ts-ignore
            console.log(error.message)
            return res.status(500).json({message: "Não foi possível registrar a loja."})
        }
    }


    static async createAddressStores (req, res) {
        // @ts-ignore
        let { postalCodeStore, streetNameStore, streetNumberStore, complementStore, neighborhoodStore, cityStore, stateStore,idStore } = req.body;

        try {
            await AddressStoresModel.create({
                postalCodeStore,
                streetNameStore,
                streetNumberStore,
                complementStore,
                neighborhoodStore,
                cityStore,
                stateStore,
                idStore
            });

            return res.json();
        } catch (error) {
            // @ts-ignore
            return res.status(500).json({message: "Não foi possível registrar o endereço do usuário."})
        }

    }

    static async createProductStore (req, res) {
        // @ts-ignore
        let { categoryProduct, descriptionProduct, priceProduct, availabilityProduct, registrationDateProduct, idStore} = req.body;
        let {filename: imageProduct} = req.file;

        try {
            await ProductsModel.create({
                categoryProduct,
                descriptionProduct,
                imageProduct,
                priceProduct,
                availabilityProduct,
                registrationDateProduct,
                idStore,
            });

            return res.json();
        } catch (error) {
            // @ts-ignore
            return res.status(500).json({message: error.message});
        }

    }

    static async getOneStores (req, res) {
        const {id} = req.params;
        try {
            const result = await StoresModel.findById(id);
            // @ts-ignore
            return res.json(result);
        } catch (error){
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."})
        }
    }

    static async getAllStores (req, res) {
        try {
            const result = await StoresModel.find();
            // @ts-ignore
            return res.json(result);
        } catch (error){
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."})
        }
    }

    static async getOneProducts (req, res) {
        const {id} = req.params;
        try {
            const result = await ProductsModel.findById(id);
            // @ts-ignore
            return res.json(result);
        } catch (error) {
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."});
        }
    }

    static async getAllProductStore (req, res) {
        const {id} = req.params;
        try {
            const result = await ProductsModel.find({idStore: id});
            // @ts-ignore
            return res.json(result);
        } catch (error) {
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."});
        }
    }

    static async loginStores (req, res) {
        const {emailStore, passwordStore} = req.body;

        const encryptedPassword = crypto.createHmac('sha512', `${process.env.ENCRYPT_KEY}`).update(passwordStore).digest('base64');
        const user = await StoresModel.findOne({emailStore}).select('+passwordCustomer');
        const password = await StoresModel.findOne({passwordStore: encryptedPassword});
        const userList = await StoresModel.findOne({emailStore});

        if(!user) return res.status(400).json({message: "Usuário não encontrado"});
        if(!password) return res.status(400).json({message: "Senha invalida"});

        // @ts-ignore
        const token = generateToken({_id: user._id, email: user.emailCustomer});

        return res.json({userList, token});
    }
}

export default CustomersController;
