import CustomersModel from '../models/CustomersModel';
import StoresModel from '../models/StoresModel';

export async function uniqueEmailCustomer(req, res, next) {
	const { emailCustomer } = req.body;

	const hasEmail = await CustomersModel.findOne({ emailCustomer });

	console.log(hasEmail);

	if (hasEmail) {
		return res.status(409).json({ error: 'Esse email já está cadastrado.' });
	}

	next();
}

export async function uniqueEmailStore(req, res, next) {
	const { emailStore } = req.body;

	const hasEmail = await StoresModel.findOne({ emailStore });

	console.log(hasEmail);

	if (hasEmail) {
		return res.status(409).json({ error: 'Esse email já está cadastrado.' });
	}

	next();
}
