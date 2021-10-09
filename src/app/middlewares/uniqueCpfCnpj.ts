import CustomersModel from '../models/CustomersModel';
import StoresModel from '../models/StoresModel';

export async function uniqueCpfCustomer(req, res, next) {
	const { cpfCustomer } = req.body;

	const hasEmail = await CustomersModel.findOne({ cpfCustomer });

	if (hasEmail) {
		return res.status(409).json({ error: 'Esse cpf já está cadastrado.' });
	}

	next();
}

export async function uniqueCnpjStore(req, res, next) {
	const { cnpjStore } = req.body;

	const hasEmail = await StoresModel.findOne({ cnpjStore });

	if (hasEmail) {
		return res.status(409).json({ error: 'Esse cnpj já está cadastrado.' });
	}

	next();
}
