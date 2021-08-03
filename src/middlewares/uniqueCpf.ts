import CustomersModel from '../models/CustomersModel';
import {NextFunction, Request, Response} from "express";

export async function uniqueCpfCustomer(request: Request, response: Response, next: NextFunction){
    const { cpfCustomer } = request.body;

    const hasEmail = await CustomersModel.findOne({cpfCustomer});

    if (hasEmail){
        return response.status(412).json({error: "Esse cpf já está cadastrado."});
    }

    next();
}
