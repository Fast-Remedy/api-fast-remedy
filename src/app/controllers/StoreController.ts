import AddressStoresModel from '../models/AddressStoresModel';
import ProductsModel from '../models/ProductsModel';
import StoresModel from '../models/StoresModel';
import crypto from 'crypto';
import validate from '../utils/validate';
import sharp from 'sharp';
import generateToken from '../utils/generateToken';
import base64_encoded from '../utils/base64Encoded';

class StoreController {
	static async createStores(req, res) {
		// @ts-ignore
		let {
			cnpjStore,
			imageStore,
			deliveryMode,
			bankNumber,
			agencyNumber,
			accountNumber,
			verifyingDigit,
			emailStore,
			passwordStore,
			companyNameStore,
			tradingNameStore,
			phoneStore,
			deliveryFeeStore,
			deliveryEstimatedTimeStore,
			registrationDateStore,
		} = req.body;

		const encryptedPassword = crypto
			.createHmac('sha512', `${process.env.ENCRYPT_KEY}`)
			.update(passwordStore)
			.digest('base64');

		await validate(req, res);

		try {
			await StoresModel.create({
				cnpjStore,
				emailStore,
				passwordStore: encryptedPassword,
				companyNameStore,
				tradingNameStore,
				phoneStore,
				deliveryFeeStore,
				deliveryEstimatedTimeStore,
				registrationDateStore,
				imageStore,
				deliveryMode,
				bankNumber,
				agencyNumber,
				accountNumber,
				verifyingDigit,
			});
			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível registrar a loja.' });
		}
	}

	static async updateStores(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let {
			cnpjStore,
			imageStore,
			deliveryMode,
			bankNumber,
			agencyNumber,
			accountNumber,
			verifyingDigit,
			emailStore,
			passwordStore,
			companyNameStore,
			tradingNameStore,
			phoneStore,
			deliveryFeeStore,
			deliveryEstimatedTimeStore,
			registrationDateStore,
		} = req.body;

		const encryptedPassword = crypto
			.createHmac('sha512', `${process.env.ENCRYPT_KEY}`)
			.update(passwordStore)
			.digest('base64');

		await validate(req, res);

		try {
			await StoresModel.findOneAndUpdate(
				{ _id: id },
				{
					cnpjStore,
					emailStore,
					passwordStore: encryptedPassword,
					companyNameStore,
					tradingNameStore,
					phoneStore,
					deliveryFeeStore,
					deliveryEstimatedTimeStore,
					registrationDateStore,
					imageStore,
					deliveryMode,
					bankNumber,
					agencyNumber,
					accountNumber,
					verifyingDigit,
				}
			);
			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível registrar a loja.' });
		}
	}

	static async createAddressStores(req, res) {
		// @ts-ignore
		let {
			streetNameStore,
			streetNumberStore,
			complementStore,
			neighborhoodStore,
			cityStore,
			stateStore,
			idStore,
		} = req.body;

		try {
			await AddressStoresModel.create({
				streetNameStore,
				streetNumberStore,
				complementStore,
				neighborhoodStore,
				cityStore,
				stateStore,
				idStore,
			});

			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: 'Não foi possível registrar o endereço do usuário.' });
		}
	}

	static async createProductStore(req, res) {
		// @ts-ignore
		let {
			categoryProduct,
			descriptionProduct,
			priceProduct,
			availabilityProduct,
			registrationDateProduct,
			idStore,
			imageProduct,
			compositionProduct,
		} = req.body;

		try {
			await ProductsModel.create({
				categoryProduct,
				descriptionProduct,
				imageProduct,
				priceProduct,
				availabilityProduct,
				registrationDateProduct,
				idStore,
				compositionProduct,
			});

			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: error.message });
		}
	}

	static async updateProductStore(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let {
			categoryProduct,
			descriptionProduct,
			priceProduct,
			availabilityProduct,
			registrationDateProduct,
			imageProduct,
			compositionProduct,
		} = req.body;

		try {
			await ProductsModel.findOneAndUpdate(
				{ _id: id },
				{
					categoryProduct,
					descriptionProduct,
					imageProduct,
					priceProduct,
					availabilityProduct,
					registrationDateProduct,
					compositionProduct,
				}
			);

			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: error.message });
		}
	}

	static async deleteProductStore(req, res) {
		const { id } = req.params;

		try {
			await ProductsModel.findByIdAndDelete({ _id: id });
			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: error.message });
		}
	}

	static async getOneStores(req, res) {
		const { id } = req.params;
		try {
			const result = await StoresModel.findById(id);
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async getDeliveryStore(req, res) {
		const { id } = req.params;
		try {
			const store = await StoresModel.findById(id);

			const result = {
				_id: store._id,
				tradingNameStore: store.tradingNameStore,
				deliveryFeeStore: store.deliveryFeeStore,
				deliveryEstimatedTimeStore: store.deliveryEstimatedTimeStore,
			};
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async getAllStores(req, res) {
		try {
			const stores = await StoresModel.find();

			const result = stores.map(store => {
				const filter = {
					_id: store._id,
					tradingNameStore: store.tradingNameStore,
					imageStore: store.imageStore,
					deliveryFeeStore: store.deliveryFeeStore,
					deliveryEstimatedTimeStore: store.deliveryEstimatedTimeStore,
				};
				return filter;
			});
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async getAllProducts(req, res) {
		try {
			const result = await ProductsModel.find();
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async getOneProducts(req, res) {
		const { id } = req.params;
		try {
			const result = await ProductsModel.findById(id);
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async getAllProductStore(req, res) {
		const { id } = req.params;
		try {
			const result = await ProductsModel.find({ idStore: id });
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async loginStores(req, res) {
		const { emailStore, passwordStore } = req.body;

		const encryptedPassword = crypto
			.createHmac('sha512', `${process.env.ENCRYPT_KEY}`)
			.update(passwordStore)
			.digest('base64');
		const store = await StoresModel.findOne({ emailStore }).select('+passwordCustomer');
		const password = await StoresModel.findOne({ passwordStore: encryptedPassword });
		const storeList = await StoresModel.findOne({ emailStore });

		if (!store) return res.status(400).json({ message: 'Usuário não encontrado' });
		if (!password) return res.status(400).json({ message: 'Senha invalida' });

		// @ts-ignore
		const token = generateToken({ _id: store._id, email: store.emailStore });

		return res.json({ storeList, token });
	}
}

export default StoreController;
