import axios from "axios";
import { ICountry } from "../models";

export const fetchCountries = async (): Promise<ICountry[]> => {
    const response = await axios.get("http://127.0.0.1:5000/countries");
    return response.data;
};
