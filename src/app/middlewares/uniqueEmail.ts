import CustomersModel from '../../models/CustomersModel';

export async function uniqueEmailCustomer(req, res, next){
    const { emailCustomer } = req.body;

    const hasEmail = await CustomersModel.findOne({emailCustomer});

    if (hasEmail){
        return res.status(412).json({error: "Esse email já está cadastrado."});
    }

    next();
}

export async function uniqueEmailStore(req, res, next){
    const { emailStore } = req.body;

    const hasEmail = await CustomersModel.findOne({emailStore});

    if (hasEmail){
        return res.status(412).json({error: "Esse email já está cadastrado."});
    }

    next();
}
