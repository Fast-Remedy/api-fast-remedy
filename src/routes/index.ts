import Router from 'express';
import CustomersController from '../controllers/CustomersController';
import {uniqueEmailCustomer} from "../middlewares/uniqueEmail";
import {uniqueCpfCustomer} from "../middlewares/uniqueCpf";
import {existIdCustomer} from "../middlewares/existId";
// import {auth} from "../middlewares/auth";
const routes = new Router();

//Customer
routes.post('/api/register/customers', uniqueEmailCustomer, uniqueCpfCustomer, CustomersController.createCustomers);
routes.post('/api/register/address/customers', existIdCustomer, CustomersController.createAddressCustomer);
routes.post('/api/register/card/customers', existIdCustomer, CustomersController.createCardCustomers);
routes.get('/api/customers/:id', CustomersController.getCustomer);
routes.get('/api/card/customers/:id',  CustomersController.getCardCustomers);
routes.get('/api/address/customers/:id',  CustomersController.getAddressCustomers);
routes.post('/api/customers/login', CustomersController.loginCustomers);

export default routes;
