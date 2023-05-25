export interface IUser {
    id?: string
    email: string 
    username: string
    password?: string
    avatar: string
    accentColor: string
    permissions?: UserPermitions
}

export interface IUserPayload {
    id: string
}

type TypeAvatar = 'basic_man' | 'basic_woman'

export interface IUserRegister {
    id?: string
    email: string 
    username: string
    password: string
    avatar: TypeAvatar
    accentColor: string
    permissions?: UserPermitions
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserPromise {
    msg: string
    sucess: boolean
    token?: string
    user?: IUser
}

export enum UserPermitions {
    user = 1, 
    admin
}