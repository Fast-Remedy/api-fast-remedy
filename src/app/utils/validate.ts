import {validationResult} from "express-validator";

function validate(request: Request, response: Response){
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        // @ts-ignore
        return response.status(400).json({ errors: errors.array() });
    }
}

export default validate;
