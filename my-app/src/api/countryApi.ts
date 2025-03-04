import axios from "axios";
import { ICountry } from "../models";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchCountries = async (): Promise<ICountry[]> => {
    try {
        const response = await axios.get(`${API_URL}/countries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};
