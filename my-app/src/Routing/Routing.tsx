import {Routes, Route} from "react-router-dom"

import { Vacations } from "../Components/Vacations/Vacations"
import { Login } from "../Components/Login/Login"
import { Register } from "../Components/Register/Register"
import { Home } from "../Components/Home/Home"
import { CreateVacation } from "../Components/CreateVacation/CreateVacation"

export function Routing(){
 
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/vacations" element={<Vacations/>}/>
                <Route path="/create-vacation" element={<CreateVacation />} />
            </Routes>
        </div>
    )
}
