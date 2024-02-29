import { IUser } from "./user"

export interface IPost {
    id?: string
    msg: string
    user: IUser 
    userId: string
}

export interface IPostCreate {
    msg: string
    userId: string
}