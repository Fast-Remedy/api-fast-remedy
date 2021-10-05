import CustomersModel from '../models/CustomersModel';
import ProductsModel from '../models/ProductsModel';

export async function existIdCustomer(req, res, next) {
	const { idCustomer } = req.body;
	const _id = idCustomer;

	try {
		await CustomersModel.findOne({ _id });
		next();
	} catch (err) {
		return res.status(404).json({ error: 'Não existe usuário.' });
	}
}

export async function existIdStore(req, res, next) {
	const { idStore } = req.body;
	const _id = idStore;

	try {
		await CustomersModel.findOne({ _id });
		next();
	} catch (err) {
		return res.status(404).json({ error: 'Não existe usuário.' });
	}
}

export async function existIdProduct(req, res, next) {
	const { idProduct } = req.body;
	const _id = idProduct;

	try {
		await ProductsModel.findOne({ _id });
		next();
	} catch (err) {
		return res.status(404).json({ error: 'Não existe usuário.' });
	}
}
