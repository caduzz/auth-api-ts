import { NextFunction, Request, Response } from "express";
import { IUserPayload } from "../@types/user";

import { config } from '../Configs/auth'

const jwt = require('jsonwebtoken');

export default async function login(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({res: { error: true, msg: 'Token não informado'}});

    const parts = authHeader.split(' ');
    if(!(parts.length === 2))return res.status(200).json({res: { error: true, msg: 'Token mal formado'}});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(200).json({res: {error: true, msg: 'Token mal formado'}});
        
    jwt.verify(token, config.secret, (err: Error, decoded: IUserPayload) => {
        if(err) return res.status(401).json({res: { error: true, msg: 'Token invalido'}})
        req.body.user = decoded

        next()
    });
};