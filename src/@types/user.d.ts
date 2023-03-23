export interface IUser {
    id?: string
    email: string 
    username: string
    password?: string
    avatar: string
    accentColor: string
}


export interface IUserRegister {
    id?: string
    email: string 
    username: string
    password: string
    avatar: 'basic_man' | 'basic_woman'
    accentColor: string
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserPromise{
    msg: string
    token?: string
}