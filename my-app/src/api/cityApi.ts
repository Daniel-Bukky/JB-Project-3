import axios from "axios";
import { ICity } from "../models/index";

export const fetchCities = async():Promise<ICity[]>=>{
    const response = await axios.get("http://127.0.0.1:5000/cities");
    return response.data 
}
