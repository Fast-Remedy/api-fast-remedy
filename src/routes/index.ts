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

// --- Customers

// Customer
routes.get('/api/customers/:id', auth, CustomersController.getCustomer);
routes.post('/api/login/customers', CustomersController.loginCustomer);
routes.post(
	'/api/register/customers',
	uniqueEmailCustomer,
	uniqueCpfCustomer,
	CustomersController.createCustomer
);
routes.put(
	'/api/update/customers/:id',
	uniqueEmailCustomer,
	auth,
	CustomersController.updateCustomer
);
routes.patch(
	'/api/update/customers/password/:id',
	auth,
	CustomersController.updatePasswordCustomer
);

// Address
routes.get('/api/address/customers/:id', auth, CustomersController.getAddressCustomer);
routes.post(
	'/api/register/address/customers',
	existIdCustomer,
	auth,
	CustomersController.createAddressCustomer
);
routes.put(
	'/api/update/address/customers/:id',
	existIdCustomer,
	auth,
	CustomersController.updateAddressCustomer
);
routes.delete(
	'/api/delete/address/customers/:id',
	existIdCustomer,
	auth,
	CustomersController.deleteAddressCustomer
);

// Card
routes.get('/api/card/customers/:id', auth, CustomersController.getCardCustomer);
routes.post(
	'/api/register/card/customers',
	existIdCustomer,
	auth,
	CustomersController.createCardCustomer
);
routes.put(
	'/api/update/card/customers/:id',
	existIdCustomer,
	auth,
	CustomersController.updateCardCustomer
);
routes.delete(
	'/api/delete/card/customers/:id',
	existIdCustomer,
	auth,
	CustomersController.deleteCardCustomer
);

/// ------

// --- Stores

// Store
routes.get('/api/stores/', StoreController.getAllStores);
routes.get('/api/stores/:id', auth, StoreController.getOneStore);
routes.get('/api/stores/:id/delivery', existIdStore, auth, StoreController.getDeliveryStore);
routes.post('/api/login/stores', StoreController.loginStore);
routes.post('/api/register/stores', uniqueEmailStore, uniqueCnpjStore, StoreController.createStore);
routes.put('/api/update/stores/:id', uniqueEmailStore, auth, StoreController.updateStore);
routes.patch(
	'/api/update/stores/password/:id',
	uniqueEmailStore,
	uniqueCnpjStore,
	auth,
	StoreController.updatePasswordStore
);

// Products
routes.get('/api/products', StoreController.getAllProducts);
routes.get('/api/products/stores/:id', existIdStore, StoreController.getAllProductStore);
routes.get('/api/products/:id', StoreController.getOneProduct);
routes.post('/api/register/product/stores', existIdStore, auth, StoreController.createProductStore);
routes.put('/api/update/product/stores/:id', auth, StoreController.updateProductStore);
routes.patch('/api/change/product/stores/:id', auth, StoreController.updateAvailability);
routes.delete('/api/delete/product/stores/:id', auth, StoreController.deleteProductStore);

// Address
routes.get('/api/address/stores/:id', auth, StoreController.getAddressStore);
routes.post('/api/register/address/stores', existIdStore, auth, StoreController.createAddressStore);
routes.put(
	'/api/update/address/stores/:id',
	existIdStore,
	auth,
	StoreController.updateAddressStore
);
routes.delete(
	'/api/delete/address/stores/:id',
	existIdStore,
	auth,
	StoreController.deleteAddressStore
);

/// ------

// --- Orders
routes.get('/api/orders/customer/:id', auth, OrdersController.getCustomerOrders);
routes.get('/api/orders/store/:id', auth, OrdersController.getStoreOrders);
routes.get('/api/orders/:id', auth, OrdersController.getOrder);
routes.post(
	'/api/create/orders',
	existIdStore,
	existIdCustomer,
	auth,
	OrdersController.createOrder
);
routes.patch('/api/change/orders/status/:id', auth, OrdersController.updateStatus);

export default routes;
