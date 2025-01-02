export interface IVacation {
    id: number,
    start_date: Date,
    end_date: Date,
    description: string,
    price: number,
    image_url: string
}

export interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: number
}

export interface ICountry {
    id: number,
    country_name: string
}