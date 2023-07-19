import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import Joi from 'joi';

import { IUserRegister } from '../@types/user';
import UserValidations from '../Validation/user';

const validate = new UserValidations()

export const avatarUserConfig : multer.Options = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err, 'erro')
                }
                const fileName = `${hash.toString('hex')}${file.originalname}`;
                cb(null, fileName)
            })
        }
    }),
    fileFilter: async (req, file, cb) => {
        const body = req.body as IUserRegister
        console.log(body)
        const schema = Joi.object<IUserRegister>({
            email: Joi
                .string()
                .email()
                .required(),
            username: Joi
                .string()
                .required(),
            name: Joi
                .string()
                .required(),
            password: Joi
                .string()
                .required(),
            accentColor: Joi
                .string()
                .required(),
        })
        
        const { error: errSechemJoi } = schema.validate(body)
        
        if(errSechemJoi)
            cb(new Error(errSechemJoi.message))

        const errValidate = await validate.register(body.email)
        if(errValidate)
            cb(new Error(errValidate.msg))

        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type.'))
        }
    },
    limits: {
        fileSize: 2 * 2024 * 1024
    }
};