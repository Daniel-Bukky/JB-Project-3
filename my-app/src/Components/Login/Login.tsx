import { useAuth } from "../../Context/AuthContext"
import { useState } from "react"
import * as React from "react";
export function Login(){

    const {login} = useAuth(); 
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] =useState<string>("")
    const [error, setError] = useState<string|null>(null)
    const [success, setSuccess] = useState<string|null>(null)


    const handleLogin = async (e:React.FormEvent)=>{
            //e.preventDefault(); // to avoid refresh 
            setError(null); 
            setSuccess(null);
            if(!email || !password){
                setError("Email and password are required")
                return;
            }
            try{
                let data = await login(email, password)
                console.log(data)
                setSuccess("Login successfull")
            }
            catch(err){
                setError("Login fail, please check your cardentials and try again")
            }
    }
    return(
        <div>
            <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="email"
                        required 
                    ></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        required 
                    ></input>
                </div>
                {error && <p style={{color:"red"}}>{error}</p>}
                {success && <p style={{color:"green"}}>{success}</p>}
                <button onClick={handleLogin}>Login</button>
        </div>
    )
}