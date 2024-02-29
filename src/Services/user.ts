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

    getUserName = async (username: string, user_follow: string) => {
        const user = await this.prisma.user.findFirst({
            where: { username }, select: {
                id: true,
                avatar: true,
                accentColor: true,
                username: true,
                name: true,
                created_at: true,
                posts: {
                    orderBy: {
                        created_at: "desc"
                    }
                },
                followers: true,
                following: true
            }
        })

        return {sucess: true, msg: 'sucess create user', status: 200, user}
    }

    get = async (id: string) => {
        const user = await this.prisma.user.findUnique({where: {id}, select: {
            id: true,
            avatar: true,
            name: true,
            accentColor: true,
            username: true
        }})

        return {sucess: true, msg: 'sucess create user', status: 200, user}
    }

    create = async ({accentColor, avatar, email, password, username, name, permissions}: IUserRegister): Promise<IUserPromise> => {
        password = await encrypt(password);

        const user = await this.prisma.user.create({
            data: {
                accentColor,
                avatar: avatar.filename,
                name,
                email,
                password,
                username,
                permissions
            },
            select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                accentColor: true,
                password: true
            }
        })

        const token = token_create({ id: user.id })

        user.password === undefined

        return {sucess: true, msg: 'sucess create user', user, status: 200,token}
    }
    
    login = async ({email, password}:IUserLogin) : Promise<IUserPromise> => {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                accentColor: true,
                password: true
            }
        }) as IUser
        
        if(!user) return {sucess: false, msg: 'email ou senha invalidos', status: 400}

        if(user.password)
            if(await encrypt_validate(password, user.password)) 
                return {sucess: false, msg: 'email ou senha invalidos', status: 400}
        user.password = undefined

        const token = token_create({ id: user.id })


        return {sucess: true, msg: 'sucesso ao fazer login', user, status: 200, token}
    }
}