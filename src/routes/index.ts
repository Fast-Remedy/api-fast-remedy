import Router from 'express';
import CustomersController from '../app/controllers/CustomersController';
import {uniqueEmailCustomer, uniqueEmailStore} from "../app/middlewares/uniqueEmail";
import {uniqueCnpjStore, uniqueCpfCustomer} from "../app/middlewares/uniqueCpfCnpj";
import {existIdCustomer, existIdStore} from "../app/middlewares/existId";
import StoreController from "../app/controllers/StoreController";
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

//Stores
routes.post('/api/register/stores', uniqueEmailStore, uniqueCnpjStore, StoreController.createStores);
routes.post('/api/register/address/stores', existIdStore, StoreController.createAddressStores);
routes.post('/api/register/product/stores', existIdStore, StoreController.createProductStore);
//routes.get('/api/customers/:id', CustomersController.getCustomer);
//routes.get('/api/card/customers/:id',  CustomersController.getCardCustomers);
//routes.get('/api/address/customers/:id',  CustomersController.getAddressCustomers);
//routes.post('/api/customers/login', CustomersController.loginCustomers);

export default routes;
