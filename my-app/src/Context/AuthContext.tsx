import { createContext, useState, ReactNode } from "react";
import { IUser } from "../models/index";
import { login, register } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthContextType {
    user: IUser | null;
    login: (email: string, password: string) => Promise<IUser | null>;
    register: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    const loginHandler = async (email: string, password: string) => {
        try {
            const response = await login(email, password);
            
            if (response.token) {
                console.log('Setting token:', response.token);
                localStorage.setItem('token', response.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
                
                const userData = {
                    firstname: response.user.firstname,
                    lastname: response.user.lastname,
                    role: response.user.role,
                    id: response.user.id
                };
                
                setUser(userData);
                return userData;
            }
            return null;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const registerHandler = async (
        firstname: string,
        lastname: string,
        email: string,
        password: string
    ) => {
        try {
            await register(firstname, lastname, email, password);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            throw error;
        }
    };

    const logoutHandler = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login: loginHandler, 
            register: registerHandler,
            logout: logoutHandler 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };
