import { Request, Response } from "express";
import { IUserPayload } from "../@types/user";

import FollowService from "../Services/follow";

export default class FollowsController {
    private service: FollowService

    constructor () {
        this.service = new FollowService()
    }

    createFollow = async (req: Request, res: Response) => {
        try {
            const { id: user_following_id }: IUserPayload = req.body.user
            const { user_followers_id } = req.body

            const msgs = await this.service.follow({user_followers_id, user_following_id})

            res.status(msgs.status).json(msgs)
        } catch (error) {
            console.log(error)        
        }
    }


    followers = async (req: Request, res: Response)=> {
        try {
            const { username } = req.params

            const msg = await this.service.followers(username)
            res.status(msg.status).json(msg)
        } catch (error) {
            console.log(error)
        }
    }
    followings = async (req: Request, res: Response)=> {
        try {
            const { username } = req.params

            const msg = await this.service.followings(username)
            res.status(msg.status).json(msg)
        } catch (error) {
            console.log(error)
        }
    }
}