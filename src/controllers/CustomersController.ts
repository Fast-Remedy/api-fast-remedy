import AddressCustomersModel from '../models/AddressCustomersModel';
import CardCustomersModel from '../models/CardCustomersModel';
import CustomersModel from '../models/CustomersModel';
import crypto from 'crypto';
import validate from '../utils/validate';

class CustomersController {
    static async createCustomers (request: Request, response: Response) {
        // @ts-ignore
        let { registrationDateCustomer, phoneCustomer, nameCustomer, passwordCustomer, emailCustomer, cpfCustomer } = request.body;

        const encryptedPassword = crypto.createHmac('sha512', `${process.env.ENCRYPT_KEY}`).update(passwordCustomer).digest('base64');

        await validate(request, response);

        try {
            await CustomersModel.create({
                registrationDateCustomer,
                phoneCustomer,
                nameCustomer,
                passwordCustomer: encryptedPassword,
                emailCustomer,
                cpfCustomer,
            });

            return response.json();
        } catch (error){
            // @ts-ignore
            return response.status(500).json({message: "Não foi possível registrar o usuário."})
        }
    }


    static async createAddressCustomer (request: Request, response: Response) {
        // @ts-ignore
        let { postalCodeCustomer, streetNameCustomer, streetNumberCustomer, complementCustomer, neighborhoodCustomer, cityCustomer, stateCustomer,mainAddressCustomer,              idCustomer} = request.body;

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

            return response.json();
        } catch (error) {
            // @ts-ignore
            return response.status(500).json({message: "Não foi possível registrar o endereço do usuário."})
        }

    }

    static async createCardCustomers (request: Request, response: Response) {
        // @ts-ignore
        let { cardTypeCustomers, cardNumberCustomers, cardExpirationDateCustomers, cardCvvCustomer, cardOwnerNameCustomer, cardOwnerCpfCustomer, mainCardCustomer, idCustomer} = request.body;

        try {
            await AddressCustomersModel.create({
                cardTypeCustomers,
                cardNumberCustomers,
                cardExpirationDateCustomers,
                cardCvvCustomer,
                cardOwnerNameCustomer,
                cardOwnerCpfCustomer,
                mainCardCustomer,
                idCustomer
            });

            return response.json();
        } catch (error) {
            // @ts-ignore
            return response.status(500).json({message: "Não foi possível registrar o cartão do usuário."})
        }

    }

}

export default CustomersController;
