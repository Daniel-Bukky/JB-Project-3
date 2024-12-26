import axios from "axios";
import { IProduct } from "../models/index";

export const fetchProducts = async():Promise<IProduct[]>=>{
    const response = await axios.get("http://127.0.0.1:5000/products");
    return response.data 
}

export const addProduct = async(product:Omit<IProduct,"id">)=>{
    let strToken = localStorage.getItem("token")
    let objToken = strToken?JSON.parse(strToken):"";

    console.log("-------------------")
    console.log(objToken.token)

    const response = await axios.post("/products", product);
    return response.data 
}

export const updateProduct = async(id:number,product:Omit<IProduct,"id">)=>{
    const response = await axios.put(`/products/${id}`, product);
    return response.data 
}

export const deleteProduct = async(id:number)=>{

    const response = await axios.delete(`/products/${id}`);
    return response.data 
}







