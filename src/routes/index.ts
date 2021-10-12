import Router from 'express';
import CustomersController from '../app/controllers/CustomersController';
import { uniqueEmailCustomer, uniqueEmailStore } from '../app/middlewares/uniqueEmail';
import { uniqueCnpjStore, uniqueCpfCustomer } from '../app/middlewares/uniqueCpfCnpj';
import { existIdCustomer, existIdProduct, existIdStore } from '../app/middlewares/existId';
import StoreController from '../app/controllers/StoreController';
import { auth } from '../app/middlewares/auth';
import OrdersController from '../app/controllers/OrdersController';
// import {auth} from "../middlewares/auth";
const routes = new Router();

routes.get('/', (req, res) => {
	return res.json({ message: 'API running' });
});

//Customer
routes.post(
	'/api/register/customers',
	uniqueEmailCustomer,
	uniqueCpfCustomer,
	CustomersController.createCustomers
);
routes.post(
	'/api/register/address/customers',
	existIdCustomer,
	auth,
	CustomersController.createAddressCustomer
);
routes.post(
	'/api/register/card/customers',
	existIdCustomer,
	auth,
	CustomersController.createCardCustomers
);
routes.get('/api/customers/:id', auth, CustomersController.getCustomer);
routes.get('/api/card/customers/:id', auth, CustomersController.getCardCustomers);
routes.get('/api/address/customers/:id', auth, CustomersController.getAddressCustomers);
routes.post('/api/login/customers', CustomersController.loginCustomers);

//Stores
routes.post(
	'/api/register/stores',
	uniqueEmailStore,
	uniqueCnpjStore,
	StoreController.createStores
);

routes.put(
	'/api/update/stores/:id',
	uniqueEmailStore,
	uniqueCnpjStore,
	auth,
	StoreController.updateStores
);

routes.post(
	'/api/register/address/stores',
	existIdStore,
	auth,
	StoreController.createAddressStores
);
routes.post('/api/register/product/stores', existIdStore, auth, StoreController.createProductStore);

routes.put('/api/update/product/stores/:id', auth, StoreController.updateProductStore);
routes.delete('/api/delete/product/stores/:id', auth, StoreController.deleteProductStore);

routes.get('/api/stores/:id', auth, StoreController.getOneStores);
routes.get('/api/stores/', StoreController.getAllStores);
routes.get('/api/products/:id', StoreController.getOneProducts);
routes.get('/api/products/stores/:id', existIdStore, StoreController.getAllProductStore);
routes.post('/api/login/stores', StoreController.loginStores);

//Orders
routes.post(
	'/api/orders',
	existIdStore,
	existIdCustomer,
	existIdProduct,
	auth,
	OrdersController.createOrder
);
routes.get('/api/get/orders/:id', auth, OrdersController.getOrder);
routes.patch('/api/change/orders/status/:id', auth, OrdersController.updateStatus);

export default routes;
