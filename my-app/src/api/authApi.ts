import axios from "axios";

export const login = async(email: string, password: string) => {
    const response = await axios.post("http://127.0.0.1:5000/login", {email, password});
    localStorage.setItem("token", JSON.stringify(response.data));
    console.log(response.data)
    return response.data 
}

export const register = async(firstname: string, lastname: string, email: string, password: string) => {
    const response = await axios.post("http://127.0.0.1:5000/register", {
        firstname,
        lastname,
        email,
        password
    });
    return response.data 
}