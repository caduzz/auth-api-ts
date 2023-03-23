import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IUser } from '../@types/user';
import UserValidations from '../Validation/user';

const validate = new UserValidations()

export default async function register(req: Request, res: Response, next: NextFunction) {
    const body = req.body as IUser
    const schema = Joi.object<IUser>({
        email: Joi
            .string()
            .email()
            .required(),
        username: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .required(),
        avatar: Joi
        .string()
        .required(),
        accentColor: Joi
            .string()
            .required()
    })

    const { error: errSechemJoi } = schema.validate(body)
    if(errSechemJoi)return res.status(400).json({sucess: false, message: errSechemJoi.message})
    const errValidate = await validate.register(body.email)
    if(errValidate)return res.status(400).json({sucess: false, message: errValidate.msg})

  next();
}