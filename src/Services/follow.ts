import { PrismaClient } from "@prisma/client";

import { IFollow } from "../@types/follow";

interface IResPromise {
    msg: string
    sucess: boolean
    status: number
}

export default class FollowService {
    private prisma: PrismaClient

    constructor () {
        this.prisma = new PrismaClient()
    }

    follow = async ({user_followers_id, user_following_id}: IFollow): Promise<IResPromise> => {
        if(user_followers_id === user_following_id)
            return {sucess: false, msg: 'Error Follow', status: 400}


        const follow = await this.prisma.follows.findFirst({ where: { AND: { 
            user_followers_id, 
            user_following_id
        }}})

        if(!follow){
            const follow_create = await this.prisma.follows.create({data: {user_followers_id, user_following_id}})
            return {sucess: true, msg: 'Sucess Follow', status: 200}
        }

        this.unfollow(follow.id)
        return {sucess: false, msg: 'Unfollow', status: 200}
        
    }
    
    unfollow = async (id : string) : Promise<IResPromise> => {
        const unfollow = await this.prisma.follows.deleteMany({ where: { id } })
        
        if(unfollow.count === 1)
            return {sucess: true, msg: 'Sucess delete Post', status: 200}
        else
            return {sucess: false, msg: 'Erro delete Post', status: 400}
    }  
       
    followers = async (username: string) => {
        if(username === '')
            return {sucess: false, msg: 'informe um usuario', status: 400}
        const user_find = await this.prisma.user.findUnique({ 
            where: { username }, 
        })

        if(user_find){
            const followers_find = await this.prisma.follows.findMany({
                where: { user_followers_id: user_find.id },
                select: {
                    user_following: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            avatar: true,
                        }
                    }
                }
            })
    
            return {sucess: true, msg: 'Sucess delete Post', status: 200, followers_find}
        }
        return {sucess: true, msg: 'User not find', status: 400}
    }

    followings = async (username: string) => {
        if(username === '')
            return {sucess: false, msg: 'informe um usuario', status: 400}
        const user_find = await this.prisma.user.findUnique({ 
            where: { username }, 
        })

        if(user_find){
            const followers_find = await this.prisma.follows.findMany({
                where: { user_following_id: user_find.id },
                select: {
                    user_followers: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            avatar: true,
                       }
                    }
                }
            })
            return {sucess: true, msg: 'Sucess delete Post', status: 200, followers_find}
        }
        return {sucess: true, msg: 'User not find', status: 400}
    }
}