import jwt from 'jsonwebtoken';

import { auth } from '../../Configs/auth';

export default class token {
    token_create = (params = {}) : string | undefined => {
        if(auth.secret){
            return jwt.sign(params, auth.secret, {
                expiresIn: 864000
            });
        }
    }
}