import axios from "axios";
export const login = async(email:string, password:string)=>{
    const response = await axios.post("http://127.0.0.1:5000/login", {email, password});
   // console.log(response)
    localStorage.setItem("token", JSON.stringify(response.data));
    console.log(response.data)
    return response.data 
}

export const register = async(email:string, password:string, cityId:number, birthday:Date,address:string )=>{
    const response = await axios.post("http://127.0.0.1:5000/register", {email, password, birthday, address, cityId});
    return response.data 
}