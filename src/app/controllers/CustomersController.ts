import AddressCustomersModel from '../models/AddressCustomersModel';
import CardCustomersModel from '../models/CardCustomersModel';
import CustomersModel from '../models/CustomersModel';
import crypto from 'crypto';
import validate from '../utils/validate';
import generateToken from '../utils/generateToken';

class CustomersController {
	// Customer
	static async getCustomer(req, res) {
		const { id } = req.params;
		try {
			const result = await CustomersModel.findById(id);
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async loginCustomer(req, res) {
		const { emailCustomer, passwordCustomer } = req.body;

		const encryptedPassword = crypto
			.createHmac('sha512', `${process.env.ENCRYPT_KEY}`)
			.update(passwordCustomer)
			.digest('base64');
		const user = await CustomersModel.findOne({ emailCustomer }).select('+passwordCustomer');
		const password = await CustomersModel.findOne({ passwordCustomer: encryptedPassword });
		const userList = await CustomersModel.findOne({ emailCustomer });

		if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });
		if (!password) return res.status(400).json({ message: 'Senha invalida' });

		// @ts-ignore
		const token = generateToken({ _id: user._id, email: user.emailCustomer });

		return res.json({ userList, token });
	}

	static async createCustomer(req, res) {
		// @ts-ignore
		let {
			registrationDateCustomer,
			phoneCustomer,
			nameCustomer,
			passwordCustomer,
			emailCustomer,
			cpfCustomer,
		} = req.body;

		const encryptedPassword = crypto
			.createHmac('sha512', `${process.env.ENCRYPT_KEY}`)
			.update(passwordCustomer)
			.digest('base64');

		await validate(req, res);

		try {
			await CustomersModel.create({
				registrationDateCustomer,
				phoneCustomer,
				nameCustomer,
				passwordCustomer: encryptedPassword,
				emailCustomer,
				cpfCustomer,
			});

			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível registrar o usuário.' });
		}
	}

	static async updateCustomer(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let { _id, registrationDateCustomer, phoneCustomer, nameCustomer, emailCustomer, cpfCustomer } =
			req.body;

		await validate(req, res);

		try {
			await CustomersModel.findOneAndUpdate(
				{ _id: id },
				{
					registrationDateCustomer,
					phoneCustomer,
					nameCustomer,
					emailCustomer,
					cpfCustomer,
				}
			);

			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível alterar o usuário.' });
		}
	}

	static async updatePasswordCustomer(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let { _id, passwordCustomer } = req.body;

		const encryptedPassword = crypto
			.createHmac('sha512', `${process.env.ENCRYPT_KEY}`)
			.update(passwordCustomer)
			.digest('base64');

		await validate(req, res);

		try {
			await CustomersModel.findOneAndUpdate(
				{ _id: id },
				{
					passwordCustomer: encryptedPassword,
				}
			);

			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível alterar a senha do usuário.' });
		}
	}

	// Address
	static async getAddressCustomer(req, res) {
		const { id } = req.params;
		try {
			const result = await AddressCustomersModel.find({ idCustomer: id });
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async createAddressCustomer(req, res) {
		// @ts-ignore
		let {
			streetNameCustomer,
			streetNumberCustomer,
			complementCustomer,
			neighborhoodCustomer,
			cityCustomer,
			stateCustomer,
			mainAddressCustomer,
			idCustomer,
		} = req.body;

		try {
			await AddressCustomersModel.create({
				streetNameCustomer,
				streetNumberCustomer,
				complementCustomer,
				neighborhoodCustomer,
				cityCustomer,
				stateCustomer,
				mainAddressCustomer,
				idCustomer,
			});

			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: 'Não foi possível registrar o endereço do usuário.' });
		}
	}

	static async updateAddressCustomer(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let {
			_id,
			streetNameCustomer,
			streetNumberCustomer,
			complementCustomer,
			neighborhoodCustomer,
			cityCustomer,
			stateCustomer,
			mainAddressCustomer,
			idCustomer,
		} = req.body;

		await validate(req, res);

		try {
			await AddressCustomersModel.findOneAndUpdate(
				{ _id: id },
				{
					streetNameCustomer,
					streetNumberCustomer,
					complementCustomer,
					neighborhoodCustomer,
					cityCustomer,
					stateCustomer,
					mainAddressCustomer,
					idCustomer,
				}
			);
			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível alterar o endereço.' });
		}
	}

	static async deleteAddressCustomer(req, res) {
		const { id } = req.params;

		try {
			await AddressCustomersModel.findByIdAndDelete({ _id: id });
			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: error.message });
		}
	}

	// Card
	static async getCardCustomer(req, res) {
		const { id } = req.params;
		try {
			const result = await CardCustomersModel.find({ idCustomer: id });
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async createCardCustomer(req, res) {
		// @ts-ignore
		let {
			cardTypeCustomers,
			cardNumberCustomers,
			cardExpirationDateCustomers,
			cardCvvCustomer,
			cardOwnerNameCustomer,
			cardOwnerCpfCustomer,
			mainCardCustomer,
			idCustomer,
		} = req.body;

		try {
			await CardCustomersModel.create({
				cardTypeCustomers,
				cardNumberCustomers,
				cardExpirationDateCustomers,
				cardCvvCustomer,
				cardOwnerNameCustomer,
				cardOwnerCpfCustomer,
				mainCardCustomer,
				idCustomer,
			});

			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: 'Não foi possível registrar o cartão do usuário.' });
		}
	}

	static async updateCardCustomer(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let {
			_id,
			cardTypeCustomers,
			cardNumberCustomers,
			cardExpirationDateCustomers,
			cardCvvCustomer,
			cardOwnerNameCustomer,
			cardOwnerCpfCustomer,
			mainCardCustomer,
			idCustomer,
		} = req.body;

		await validate(req, res);

		try {
			await CardCustomersModel.findOneAndUpdate(
				{ _id: id },
				{
					cardTypeCustomers,
					cardNumberCustomers,
					cardExpirationDateCustomers,
					cardCvvCustomer,
					cardOwnerNameCustomer,
					cardOwnerCpfCustomer,
					mainCardCustomer,
					idCustomer,
				}
			);

			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: 'Não foi possível alterar o cartão do usuário.' });
		}
	}

	static async deleteCardCustomer(req, res) {
		const { id } = req.params;

		try {
			await CardCustomersModel.findByIdAndDelete({ _id: id });
			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: error.message });
		}
	}
}

export default CustomersController;
