import OrdersModel from '../models/OrdersModel';
import CustomersModel from '../models/CustomersModel';
import StoresModel from '../models/StoresModel';

class OrdersController {
	static async getCustomerOrders(req, res) {
		const { id } = req.params;
		try {
			const orderResult = await OrdersModel.find({ idCustomer: id });
			let storeResult = [];

			for (const order of orderResult) {
				const store = await StoresModel.findById(order.idStore);
				storeResult.push(store);
			}

			const stores = storeResult.map(store => ({
				tradingNameStore: store.tradingNameStore,
				phoneStore: store.phoneStore,
				imageStore: store.imageStore,
			}));

			let result = orderResult.map((item, i) => Object.assign({}, item._doc, stores[i]));

			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async getStoreOrders(req, res) {
		const { id } = req.params;
		try {
			const orderResult = await OrdersModel.find({ idStore: id });
			let customerResult = [];

			for (const order of orderResult) {
				const customer = await CustomersModel.findById(order.idCustomer);
				customerResult.push(customer);
			}

			const customers = customerResult.map(customer => ({
				nameCustomer: customer.nameCustomer,
				phoneCustomer: customer.phoneCustomer,
			}));

			let result = orderResult.map((item, i) => Object.assign({}, item._doc, customers[i]));

			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async getOrder(req, res) {
		const { id } = req.params;
		try {
			const orderResult = await OrdersModel.findById(id);
			const customerResult = await CustomersModel.findById(orderResult.idCustomer);
			const storeResult = await StoresModel.findById(orderResult.idStore);
			const result = {
				...orderResult,
				customer: {
					nameCustomer: customerResult.nameCustomer,
					phoneCustomer: customerResult.phoneCustomer,
				},
				store: {
					tradingNameStore: storeResult.tradingNameStore,
					phoneStore: storeResult.phoneStore,
					imageStore: storeResult.imageStore,
				},
			};
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async createOrder(req, res) {
		// @ts-ignore
		let {
			idCustomer,
			idStore,
			idDeliveryMan,
			orderProducts,
			dateOrder,
			statusOrder,
			totalOrder,
			subTotalOrder,
			deliveryEstimatedOrder,
			deliveryFeeOrder,
			paymentOrder,
			addressCostumer,
			addressStore,
		} = req.body;

		try {
			await OrdersModel.create({
				idCustomer,
				idStore,
				idDeliveryMan,
				orderProducts,
				dateOrder,
				statusOrder,
				totalOrder,
				subTotalOrder,
				deliveryEstimatedOrder,
				deliveryFeeOrder,
				paymentOrder,
				addressCostumer,
				addressStore,
			});

			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível registrar o pedido.' });
		}
	}

	static async updateStatus(req, res) {
		const { id } = req.params;
		const { statusOrder } = req.body;

		try {
			await OrdersModel.findOneAndUpdate({ _id: id }, { statusOrder: statusOrder });
			// @ts-ignore
			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}
}

export default OrdersController;
