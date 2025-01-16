export interface IVacation {
    id: number,
    start_date: Date,
    end_date: Date,
    description: string,
    price: number,
    image_url: string,
    country_id: number
}

export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    role: number;
    // email and password are not needed in the user state
}

export interface ICountry {
    id: number,
    country_name: string
}

export interface ILike {
    user_id: number;
    vacation_id: number;
}