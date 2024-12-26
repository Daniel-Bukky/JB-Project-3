import {Routes, Route} from "react-router-dom"

import { Products } from "../Components/Products/Products"
import { Login } from "../Components/Login/Login"
import { Register } from "../Components/Register/Register"
import { Home } from "../Components/Home/Home"

export function Routing(){
 
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/products" element={<Products/>}/>
            </Routes>
        </div>
    )
}
