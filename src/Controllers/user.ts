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
            const { accentColor, email, password, username, name }:IUserRegister = req.body
            const file = req.file

            if(file !== undefined){
                const avatar = file

                const msg = await this.service.create({
                    accentColor,
                    avatar,
                    name,
                    email,
                    password,
                    username,
                    permissions: 1
                })
        
                res.status(msg.status).json(msg)
            }else {
                res.status(400).json({msg: 'avatar invalido'})
            }
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

            res.status(msg.status).json(msg)
        } catch (error) {
            console.log(error)        
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.body.user as IUserPayload

            const msg = await this.service.get(id)

            res.status(msg.status).json(msg)
        } catch (error) {
            console.log(error)        
        }
    }

    getUserName = async (req: Request, res: Response) => {
        const { id } = req.body.user as IUserPayload
        const { username } = req.params
        const msg = await this.service.getUserName(username, id)
        res.status(msg.status).json(msg)
    }
}