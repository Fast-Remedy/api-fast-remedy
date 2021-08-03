import Router, {request, response} from 'express';
import RegisterCustomersController from '../controllers/RegisterCustomersController';
import {body} from 'express-validator';
import regex from "../validations/customersValidation";
import {uniqueEmailCustomer} from "../middlewares/uniqueEmail";
import {uniqueCpfCustomer} from "../middlewares/uniqueCpf";
const routes = new Router();

/* Login */
// routes.use('/api/register');
routes.post('/api/register/customers',
    body('emailCustomer').exists().isEmail().normalizeEmail(),
    body('passwordCustomer').exists().isLength({ min: 8}),
    body('registrationDateCustomer').exists(),
    body('nameCustomer').exists(),
    body('cpfCustomer').exists().matches(regex.cpf),
    body('phoneCustomer').exists().matches(regex.phone),
    uniqueEmailCustomer,
    uniqueCpfCustomer,
    RegisterCustomersController.createCustomers
);

export default routes;
