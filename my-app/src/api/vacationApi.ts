import axios from "axios";
import { IVacation } from "../models/index";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface VacationResponse {
    past_vacations: IVacation[];
    ongoing_vacations: IVacation[];
    future_vacations: IVacation[];
}

export const fetchVacations = async(): Promise<VacationResponse> => {
    try {
        const response = await axios.get(`${API_URL}/vacations`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vacations:', error);
        throw error;
    }
}

export const updateVacation = async(id:number,vacation:Omit<IVacation,"id">)=>{
    const response = await axios.put(`${API_URL}/vacation/${id}`, vacation);
    console.log(vacation);
    return response.data 
}

export const deleteVacation = async(id:number)=>{
    const response = await axios.delete(`${API_URL}/vacation/${id}`);
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
    const response = await axios.post(`${API_URL}/vacation`, vacationData);
    return response.data;
};

export const fetchVacationStatistics = async (): Promise<VacationResponse> => {
    try {
        const response = await axios.get(`${API_URL}/vacation/statistics`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vacation statistics:', error);
        throw error;
    }
};







