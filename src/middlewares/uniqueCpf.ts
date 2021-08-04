import CustomersModel from '../models/CustomersModel';

export async function uniqueCpfCustomer(req, res, next){
    const { cpfCustomer } = req.body;

    const hasEmail = await CustomersModel.findOne({cpfCustomer});

    if (hasEmail){
        return res.status(412).json({error: "Esse cpf já está cadastrado."});
    }

    next();
}
