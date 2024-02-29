import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IPostCreate } from '../@types/posts';

export default class PostMiddlewares {
    async publicar (req: Request, res: Response, next: NextFunction) {
        const body = req.body as IPostCreate
        const schema = Joi.object<IPostCreate>({
            msg: Joi
                .string()
                .required(),
        })

        const { error } = schema.validate(body)
        console.log(error)
        if(error)
            return res.status(400).json({sucess: false, msg: error.message})
        next();
    }
}