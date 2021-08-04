import CustomersModel from '../models/CustomersModel';

export async function existIdCustomer(req, res, next){
    const { idCustomer } = req.body;
    const _id = idCustomer;

    try{
        await CustomersModel.findOne({_id});
        next();
    } catch (err){
        return res.status(412).json({error: "Não existe usuário."});
    }

}
