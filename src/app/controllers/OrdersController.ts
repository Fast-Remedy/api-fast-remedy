import OrdersModel from '../models/OrdersModel';

class OrdersController {
	static async createOrder(req, res) {
		// @ts-ignore
		let {
			idCustomer,
			idStore,
			idDeliveryMan,
			idProduct,
			dateOrder,
			statusOrder,
			totalOrder,
			subTotalOrder,
			deliveryEstimatedOrder,
			deliveryFeeOrder,
		} = req.body;

		try {
			await OrdersModel.create({
				idCustomer,
				idStore,
				idDeliveryMan,
				idProduct,
				dateOrder,
				statusOrder,
				totalOrder,
				subTotalOrder,
				deliveryEstimatedOrder,
				deliveryFeeOrder,
			});

			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível registrar a loja.' });
		}
	}

	static async getOrder(req, res) {
		const { id } = req.params;
		try {
			const result = await OrdersModel.findById(id);
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
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
