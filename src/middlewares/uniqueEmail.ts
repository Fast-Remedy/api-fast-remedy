import CustomersModel from '../models/CustomersModel';
import {NextFunction, Request, Response} from "express";

export async function uniqueEmailCustomer(request: Request, response: Response, next: NextFunction){
    const { emailCustomer } = request.body;

    const hasEmail = await CustomersModel.findOne({emailCustomer});

    if (hasEmail){
        return response.status(412).json({error: "Esse email já está cadastrado."});
    }

    next();
}
