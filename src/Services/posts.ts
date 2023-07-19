import { PrismaClient } from "@prisma/client";

import { IPost, IPostCreate } from "../@types/posts";

interface IResPromise {
    msg: string
    sucess: boolean
    status: number
    post?: IPost
    posts?: IPost[]
}

export default class PostService {
    private prisma: PrismaClient

    constructor () {
        this.prisma = new PrismaClient()
    }

    homePosts = async (id: string) => {
        const posts = await this.prisma.posts.findMany({ 
            where: {
                NOT: { userId: id }
            }, 
            orderBy: {
                created_at: "desc"
            },
            include: { 
                user: {
                    select: {
                        avatar: true,
                        username: true,
                        name: true,
                        id: true
                    }
                }
            }
        })

        return {sucess: true, msg: 'Sucess Get Posts', status: 200, posts}
    }

    list = async (id: string) => {
        const posts = await this.prisma.posts.findMany({
            where: {
                userId: id
            }, 
            select: {
                id: true,
                msg: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        name: true,
                        username: true,
                        accentColor: true,
                    }
                }
            },
        })

        return {sucess: true, msg: 'Sucess Get Posts', status: 200, posts}
    }

    create = async ({msg, userId}: IPostCreate): Promise<IResPromise> => {
        const post = await this.prisma.posts.create({
            data: {
                msg,
                userId
            }
        })
        
        return {sucess: true, msg: 'Sucess Create Post', status: 200}
    }
    
    delete = async (id : string) : Promise<IResPromise> => {
        const post_delete = await this.prisma.posts.deleteMany({ where: { id } })
        
        if(post_delete.count === 1)
            return {sucess: true, msg: 'Sucess delete Post', status: 200}
        else
            return {sucess: false, msg: 'Erro delete Post', status: 400}
    }   
}