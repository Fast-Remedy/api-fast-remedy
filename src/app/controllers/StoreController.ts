import AddressStoresModel from '../models/AddressStoresModel';
import ProductsModel from '../models/ProductsModel';
import StoresModel from '../models/StoresModel';
import crypto from 'crypto';
import validate from '../utils/validate';
import sharp from 'sharp';
import generateToken from '../utils/generateToken';
import base64_encoded from '../utils/base64Encoded';

class StoreController {
	// Store
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

	static async getOneStore(req, res) {
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

	static async loginStore(req, res) {
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

	static async createStore(req, res) {
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

	static async updateStore(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let {
			imageStore,
			deliveryMode,
			bankNumber,
			agencyNumber,
			accountNumber,
			verifyingDigit,
			emailStore,
			companyNameStore,
			tradingNameStore,
			phoneStore,
			deliveryFeeStore,
			deliveryEstimatedTimeStore,
			registrationDateStore,
		} = req.body;

		await validate(req, res);

		try {
			await StoresModel.findByIdAndUpdate(
				{ _id: id },
				{
					emailStore,
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
			return res.status(500).json({ message: 'Não foi possível alterar a loja.' });
		}
	}

	static async updatePasswordStore(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let { _id, passwordStore } = req.body;

		const encryptedPassword = crypto
			.createHmac('sha512', `${process.env.ENCRYPT_KEY}`)
			.update(passwordStore)
			.digest('base64');

		await validate(req, res);

		try {
			await StoresModel.findByIdAndUpdate(
				{ _id: id },
				{
					passwordStore: encryptedPassword,
				}
			);
			return res.json();
		} catch (error) {
			// @ts-ignore
			console.log(error.message);
			return res.status(500).json({ message: 'Não foi possível alterar a senha da loja.' });
		}
	}

	// Products
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

	static async getOneProduct(req, res) {
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
			await ProductsModel.findByIdAndUpdate(
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

	static async updateAvailability(req, res) {
		const { id } = req.params;
		const { availabilityProduct } = req.body;

		try {
			await ProductsModel.findByIdAndUpdate(
				{ _id: id },
				{ availabilityProduct: availabilityProduct }
			);
			// @ts-ignore
			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
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

	// Address
	static async getAddressStore(req, res) {
		const { id } = req.params;
		try {
			const result = await AddressStoresModel.find({ idStore: id });
			// @ts-ignore
			return res.json(result);
		} catch (error) {
			// @ts-ignore
			return res.status(404).json({ message: 'Dados não encontrados.' });
		}
	}

	static async createAddressStore(req, res) {
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
			return res.status(500).json({ message: 'Não foi possível registrar o endereço da loja.' });
		}
	}

	static async updateAddressStore(req, res) {
		const { id } = req.params;
		// @ts-ignore
		let {
			_id,
			streetNameStore,
			streetNumberStore,
			complementStore,
			neighborhoodStore,
			cityStore,
			stateStore,
			idStore,
		} = req.body;

		await validate(req, res);

		try {
			await AddressStoresModel.findOneAndUpdate(
				{ _id: id },
				{
					streetNameStore,
					streetNumberStore,
					complementStore,
					neighborhoodStore,
					cityStore,
					stateStore,
					idStore,
				}
			);

			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: 'Não foi possível alterar o endereço da loja.' });
		}
	}

	static async deleteAddressStore(req, res) {
		const { id } = req.params;

		try {
			await AddressStoresModel.findByIdAndDelete({ _id: id });
			return res.json();
		} catch (error) {
			// @ts-ignore
			return res.status(500).json({ message: error.message });
		}
	}
}

export default StoreController;
