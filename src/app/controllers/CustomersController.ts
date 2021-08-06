import AddressCustomersModel from '../../models/AddressCustomersModel';
import CardCustomersModel from '../../models/CardCustomersModel';
import CustomersModel from '../../models/CustomersModel';
import crypto from 'crypto';
import validate from '../utils/validate';
import generateToken from "../utils/generateToken";

class CustomersController {
    static async createCustomers (req, res) {
        // @ts-ignore
        let { registrationDateCustomer, phoneCustomer, nameCustomer, passwordCustomer, emailCustomer, cpfCustomer } = req.body;

        const encryptedPassword = crypto.createHmac('sha512', `${process.env.ENCRYPT_KEY}`).update(passwordCustomer).digest('base64');

        await validate(req, res);

        try {
            await CustomersModel.create({
                registrationDateCustomer,
                phoneCustomer,
                nameCustomer,
                passwordCustomer: encryptedPassword,
                emailCustomer,
                cpfCustomer,
            });

            return res.json();
        } catch (error){
            // @ts-ignore
            return res.status(500).json({message: "Não foi possível registrar o usuário."})
        }
    }


    static async createAddressCustomer (req, res) {
        // @ts-ignore
        let { postalCodeCustomer, streetNameCustomer, streetNumberCustomer, complementCustomer, neighborhoodCustomer, cityCustomer, stateCustomer,mainAddressCustomer, idCustomer} = req.body;

        try {
            await AddressCustomersModel.create({
                postalCodeCustomer,
                streetNameCustomer,
                streetNumberCustomer,
                complementCustomer,
                neighborhoodCustomer,
                cityCustomer,
                stateCustomer,
                mainAddressCustomer,
                idCustomer
            });

            return res.json();
        } catch (error) {
            // @ts-ignore
            return res.status(500).json({message: "Não foi possível registrar o endereço do usuário."})
        }

    }

    static async createCardCustomers (req, res) {
        // @ts-ignore
        let { cardTypeCustomers, cardNumberCustomers, cardExpirationDateCustomers, cardCvvCustomer, cardOwnerNameCustomer, cardOwnerCpfCustomer, mainCardCustomer, idCustomer} = req.body;

        try {
            await CardCustomersModel.create({
                cardTypeCustomers,
                cardNumberCustomers,
                cardExpirationDateCustomers,
                cardCvvCustomer,
                cardOwnerNameCustomer,
                cardOwnerCpfCustomer,
                mainCardCustomer,
                idCustomer
            });

            return res.json();
        } catch (error) {
            // @ts-ignore
            return res.status(500).json({message: "Não foi possível registrar o cartão do usuário."})
        }

    }

    static async getCustomer (req, res) {
        const {id} = req.params;
        try {
            const result = await CustomersModel.findById(id);
            // @ts-ignore
            return res.json(result);
        } catch (error){
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."})
        }
    }

    static async getCardCustomers (req, res) {
        const {id} = req.params;
        try {
            const result = await CardCustomersModel.find({idCustomer: id});
            // @ts-ignore
            return res.json(result);
        } catch (error) {
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."});
        }
    }

    static async getAddressCustomers (req, res) {
        const {id} = req.params;
        try {
            const result = await AddressCustomersModel.find({idCustomer: id});
            // @ts-ignore
            return res.json(result);
        } catch (error) {
            // @ts-ignore
            return res.status(404).json({message: "Dados não encontrados."});
        }
    }

    static async loginCustomers (req, res) {
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
    }
}

export default CustomersController;
