import { PrismaClient } from "@prisma/client";
import { IUserRegister, IUserPromise, IUserLogin, IUser } from "../@types/user";

import crypt from "./Utils/crypt";
import token from "./Utils/token";

const { encrypt, encrypt_validate } = new crypt()
const { token_create } = new token()

export default class UserService {
    private prisma: PrismaClient

    constructor () {
        this.prisma = new PrismaClient()
    }

    get = async (id: string) => {
        const user = await this.prisma.user.findUnique({where: {id}, select: {
            id: true,
            email: true,
            avatar: true,
            accentColor: true,
            username: true
        }})

        return {sucess: true, msg: 'sucess create user', user}
    }

    create = async ({accentColor, avatar, email, password, username, permissions}: IUserRegister): Promise<IUserPromise> => {
        const image = avatar === 'basic_man' ? 'profile_basic_man.jpg' : 'profile_basic_woman.jpg'
        
        password = await encrypt(password);

        const user = await this.prisma.user.create({
            data: {
                accentColor,
                avatar: image,
                email,
                password,
                username,
                permissions
            }
        })

        console.log(user.id)

        const token = token_create({ id: user.id })

        return {sucess: true, msg: 'sucess create user', token}
    }
    
    login = async ({email, password}:IUserLogin) : Promise<IUserPromise> => {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })
        
        if(!user) return {sucess: false, msg: 'Email not Found'}

        if(await encrypt_validate(password, user.password)) return {sucess: false, msg: 'Password Invalid'}

        const token = token_create({ id: user.id })

        return {sucess: false, msg: 'Sucess Login', token}
    }
}