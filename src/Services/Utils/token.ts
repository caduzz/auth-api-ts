import jwt from 'jsonwebtoken';

import {config} from '../../Configs/auth';

export default class token {
    token_create = (params = {}) : string | undefined => {
        if(config.secret){
            return jwt.sign(params, config.secret, {
                expiresIn: 864000
            });
        }
    }
}