export interface IProduct {
    id: number,
    price: number,
    name: string,
    imageUrl: string
}

export interface IUser {
    id: number,
    email: string,
    cityId: number,
    birthday: Date,
    address: string
}

export interface ICity {
    id: number,
    name: string
}