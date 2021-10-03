import Router from 'express';
import CustomersController from '../app/controllers/CustomersController';
import { uniqueEmailCustomer, uniqueEmailStore } from '../app/middlewares/uniqueEmail';
import { uniqueCnpjStore, uniqueCpfCustomer } from '../app/middlewares/uniqueCpfCnpj';
import { existIdCustomer, existIdProduct, existIdStore } from '../app/middlewares/existId';
import StoreController from '../app/controllers/StoreController';
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import { auth } from '../app/middlewares/auth';
import OrdersController from '../app/controllers/OrdersController';
// import {auth} from "../middlewares/auth";
const routes = new Router();
const uploads = multer(multerConfig);

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
	CustomersController.createAddressCustomer
);
routes.post(
	'/api/register/card/customers',
	existIdCustomer,
	CustomersController.createCardCustomers
);
routes.get('/api/customers/:id', CustomersController.getCustomer);
routes.get('/api/card/customers/:id', CustomersController.getCardCustomers);
routes.get('/api/address/customers/:id', CustomersController.getAddressCustomers);
routes.post('/api/login/customers', CustomersController.loginCustomers);

//Stores
routes.post(
	'/api/register/stores',
	uniqueEmailStore,
	uniqueCnpjStore,
	StoreController.createStores
);
routes.post('/api/register/address/stores', existIdStore, StoreController.createAddressStores);
routes.post(
	'/api/register/product/stores',
	uploads.single('imageProduct'),
	existIdStore,
	StoreController.createProductStore
);
routes.get('/api/stores/:id', auth, StoreController.getOneStores);
routes.get('/api/stores/', auth, StoreController.getAllStores);
routes.get('/api/products/:id', auth, StoreController.getOneProducts);
routes.get('/api/products/stores/:id', existIdStore, auth, StoreController.getAllProductStore);
routes.post('/api/login/stores', StoreController.loginStores);

//Orders
routes.post(
	'/api/orders',
	existIdStore,
	existIdCustomer,
	existIdProduct,
	OrdersController.createOrder
);
routes.get('/api/get/orders/:id', auth, OrdersController.getOrder);
routes.patch('/api/change/orders/status/:id', auth, OrdersController.updateStatus);

export default routes;
