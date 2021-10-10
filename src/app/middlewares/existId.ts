import CustomersModel from '../models/CustomersModel';
import StoresModel from '../models/StoresModel';
import ProductsModel from '../models/ProductsModel';

export async function existIdCustomer(req, res, next) {
	const { idCustomer } = req.body;
	const _id = idCustomer;

	try {
		await CustomersModel.findOne({ _id });
		next();
	} catch (err) {
		return res.status(404).json({ error: 'Usuário não encontrado.' });
	}
}

export async function existIdStore(req, res, next) {
	const { idStore } = req.body;
	const _id = idStore;

	try {
		await StoresModel.findOne({ _id });
		next();
	} catch (err) {
		return res.status(404).json({ error: 'Loja não encontrada.' });
	}
}

export async function existIdProduct(req, res, next) {
	const { idProduct } = req.body;
	const _id = idProduct;

	try {
		await ProductsModel.findOne({ _id });
		next();
	} catch (err) {
		return res.status(404).json({ error: 'Produto não encontrado.' });
	}
}
