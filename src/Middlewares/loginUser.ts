import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { IUserLogin } from '../@types/user';

export default async function login(req: Request, res: Response, next: NextFunction) {
    const body = req.body as IUserLogin
    const schema = Joi.object<IUserLogin>({
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .required(),
    })

    const { error: errSechemJoi } = schema.validate(body)
    if(errSechemJoi)return res.status(400).json({sucess: false, message: errSechemJoi.message})

    next();
}