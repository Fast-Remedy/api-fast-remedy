import AddressStoresModel from '../../models/AddressStoresModel';
import ProductsModel from '../../models/ProductsModel';
import StoresModel from '../../models/StoresModel';
import crypto from 'crypto';
import validate from '../utils/validate';
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
        let { categoryProduct, descriptionProduct, imageProduct, priceProduct, availabilityProduct, registrationDateProduct, idStore} = req.body;

        try {
            await ProductsModel.create({
                categoryProduct,
                descriptionProduct,
                imageProduct: base64_encoded(imageProduct),
                priceProduct,
                availabilityProduct,
                registrationDateProduct,
                idStore,
                itSold: false,
            });

            return res.json();
        } catch (error) {
            // @ts-ignore
            return res.status(500).json({message: "Não foi possível registrar o produto da loja."})
        }

    }

    /*static async getCustomer (req, res) {
        const {id} = req.params;
        try {
            const result = await CustomersModel.findById(id);
            // @ts-ignore
            return res.json(result);
        } catch (error){
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."})
        }
    }*/

    /*static async getCardCustomers (req, res) {
        const {id} = req.params;
        try {
            const result = await CardCustomersModel.find({idCustomer: id});
            // @ts-ignore
            return res.json(result);
        } catch (error) {
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."});
        }
    }*/

    /*static async getAddressCustomers (req, res) {
        const {id} = req.params;
        try {
            const result = await AddressCustomersModel.find({idCustomer: id});
            // @ts-ignore
            return res.json(result);
        } catch (error) {
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."});
        }
    }*/

    /*static async loginCustomers (req, res) {
        const {emailCustomer, passwordCustomer} = req.body;

        const encryptedPassword = crypto.createHmac('sha512', `${process.env.ENCRYPT_KEY}`).update(passwordCustomer).digest('base64');
        const user = await CustomersModel.findOne({emailCustomer}).select('+passwordCustomer');
        const password = await CustomersModel.findOne({passwordCustomer: encryptedPassword});
        const userList = await CustomersModel.findOne({emailCustomer});

        if(!user) return res.status(400).json({message: "Usuário não encontrado"});
        if(!password) return res.status(400).json({message: "Senha invalida"});

        // @ts-ignore
        const token = generateToken({_id: user._id, email: user.emailCustomer});

        return res.json({userList, token});
    }*/
}

export default CustomersController;
