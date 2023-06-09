import { Request, Response } from "express";
import { IUser, IUserLogin, IUserPayload, IUserRegister } from "../@types/user";
import UserService from "../Services/user";

export default class UserController {
    private service: UserService

    constructor () {
        this.service = new UserService()
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const { accentColor, email, avatar, password, username, permissions }:IUserRegister = req.body
            
            const msg = await this.service.create({
                accentColor,
                avatar,
                email,
                password,
                username,
                permissions
            })
    
            res.json(msg)
        } catch (error) {
            console.log(error)        
        }
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } : IUserLogin = req.body

            const msg = await this.service.login({
                email, 
                password
            })

            res.json(msg)
        } catch (error) {
            console.log(error)        
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.body.user as IUserPayload

            const msg = await this.service.get(id)

            res.json(msg)
        } catch (error) {
            console.log(error)        
        }
    }
}