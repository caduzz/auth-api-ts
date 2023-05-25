import { Request, Response } from "express";
import { IUserPayload } from "../@types/user";

import PostService from "../Services/posts";

export default class PostsController {
    private service: PostService

    constructor () {
        this.service = new PostService()
    }

    createPost = async (req: Request, res: Response) => {
        try {
            const { id }: IUserPayload = req.body.user
            const msg = req.body.msg
            
            const msgs = await this.service.create({
                msg,
                userId: id 
            })
    
            res.json(msgs)
        } catch (error) {
            console.log(error)        
        }
    }

    getPosts = async (req: Request, res: Response) => {
        try {
            const { id }: IUserPayload = req.body.user

            const msg = await this.service.list(id)

            res.json(msg)
        } catch (error) {
            console.log(error)        
        }
    }
}