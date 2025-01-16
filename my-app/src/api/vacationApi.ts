import axios from "axios";
import { IVacation } from "../models/index";

export const fetchVacations = async():Promise<IVacation[]>=>{
    const response = await axios.get("http://127.0.0.1:5000/vacations");
    return response.data 
}

export const updateVacation = async(id:number,vacation:Omit<IVacation,"id">)=>{
    const response = await axios.put(`http://127.0.0.1:5000/vacation/${id}`, vacation);
    console.log(vacation);
    return response.data 
}

export const deleteVacation = async(id:number)=>{
    const response = await axios.delete(`http://127.0.0.1:5000/vacation/${id}`);
    return response.data 
}

export const createVacation = async (vacationData: {
    description: string;
    price: number;
    image_url: string;
    start_date: Date;
    end_date: Date;
    country_id: number;
}) => {
    const response = await axios.post("http://127.0.0.1:5000/vacation", vacationData);
    return response.data;
};







