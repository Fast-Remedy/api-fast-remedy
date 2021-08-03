import AddressCustomersModel from '../models/AddressCustomersModel';
import CardCustomersModel from '../models/CardCustomersModel';
import CustomersModel from '../models/CustomersModel';
import crypto from 'crypto';
import validate from '../utils/validate';

class RegisterCustomersController {
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
}

export default RegisterCustomersController;
