import { PrismaClient } from "@prisma/client";
import { IUserRegister, IUserPromise, IUserLogin } from "../@types/user";

import crypt from "./Utils/crypt";
import token from "./Utils/token";

const { encrypt, encrypt_validate } = new crypt()
const { token_create } = new token()

export default class UserService {
    private prisma: PrismaClient

    constructor () {
        this.prisma = new PrismaClient()
    }

    create = async ({accentColor, avatar, email, password, username}: IUserRegister): Promise<IUserPromise> => {
        const image = avatar === 'basic_man' ? 'profile_basic_man.jpg' : 'profile_basic_woman.jpg'
        
        password = await encrypt(password);

        await this.prisma.user.create({
            data: {
                accentColor,
                avatar: image,
                email,
                password,
                username
            }
        })
        return {msg: 'sucess create user'}
    }
    
    login = async ({email, password}:IUserLogin) : Promise<IUserPromise> => {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })
        
        if(!user) return {msg: 'Email not Found'}

        if(await encrypt_validate(password, user.password)) return {msg: 'Password Invalid'}

        const token = token_create()

        return {msg: 'Sucess Login', token}
    }
}