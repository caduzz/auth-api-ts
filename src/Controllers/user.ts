import { Request, Response } from "express";
import { IUser, IUserLogin, IUserRegister } from "../@types/user";
import UserService from "../Services/user";

export default class UserController {
    private service: UserService

    constructor () {
        this.service = new UserService()
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const { accentColor, email, avatar, password, username }:IUserRegister = req.body

            const msg = await this.service.create({
                accentColor,
                avatar,
                email,
                password,
                username
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
}