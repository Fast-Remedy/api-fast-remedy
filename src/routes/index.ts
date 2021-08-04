import Router from 'express';
import CustomersController from '../controllers/CustomersController';
import {uniqueEmailCustomer} from "../middlewares/uniqueEmail";
import {uniqueCpfCustomer} from "../middlewares/uniqueCpf";
import {existIdCustomer} from "../middlewares/existId";
const routes = new Router();

/* Login */
// routes.use('/api/register');
routes.post('/api/register/customers',
    uniqueEmailCustomer,
    uniqueCpfCustomer,
    CustomersController.createCustomers
);

routes.post('/api/register/address/customers',
    existIdCustomer,
    CustomersController.createAddressCustomer
);

routes.post('/api/register/card/customers',
    existIdCustomer,
    CustomersController.createCardCustomers
);

export default routes;
