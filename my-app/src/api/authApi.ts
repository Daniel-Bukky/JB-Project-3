import axios from "axios";

export const login = async (email: string, password: string) => {
    const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password
    });
    
    // Set default Authorization header for all future requests
    if (response.data.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return {
        user: response.data,
        token: response.data.token
    };
};

export const register = async(firstname: string, lastname: string, email: string, password: string) => {
    const response = await axios.post("http://127.0.0.1:5000/register", {
        firstname,
        lastname,
        email,
        password
    });
    return response.data;
};