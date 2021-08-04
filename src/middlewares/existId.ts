import CustomersModel from '../models/CustomersModel';
import {NextFunction, Request, Response} from "express";

export async function existIdCustomer(request: Request, response: Response, next: NextFunction){
    const { idCustomer } = request.body;
    const _id = idCustomer;

    try{
        await CustomersModel.findOne({_id});
        next();
    } catch (err){
        return response.status(412).json({error: "Não existe usuário."});
    }

}
