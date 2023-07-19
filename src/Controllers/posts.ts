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

            res.status(msgs.status).json(msgs)
        } catch (error) {
            console.log(error)        
        }
    }

    homeGetPosts =  async (req: Request, res: Response) => {
        try {
            const { id }: IUserPayload = req.body.user

            const msg = await this.service.homePosts(id)

            res.status(msg.status).json(msg)
        } catch (error) {
            console.log(error)        
        }
    }

    getPosts = async (req: Request, res: Response) => {
        try {
            const { id }: IUserPayload = req.body.user

            const msg = await this.service.list(id)

            res.status(msg.status).json(msg)
        } catch (error) {
            console.log(error)        
        }
    }

    deletePosts = async (req: Request, res: Response)=> {
        try {
            const { id } = req.params

            const msg = await this.service.delete(id)
            res.status(msg.status).json(msg)
        } catch (error) {
            console.log(error)
        }
    }
}