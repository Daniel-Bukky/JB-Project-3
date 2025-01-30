import { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../models/index";
import { login, register } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserData } from "../api/dataApi";

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

    // Check authentication on initial load
    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Set the token in axios headers
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    // Fetch user data to validate token and get user info
                    const userData = await getUserData();
                    
                    if (userData) {
                        const userInfo = {
                            id: userData.id,
                            firstname: userData.firstname,
                            lastname: userData.lastname,
                            role: userData.role
                        };
                        setUser(userInfo);
                    } else {
                        // If getUserData fails, log out
                        logout();
                    }
                } catch (error) {
                    console.error('Token validation failed:', error);
                    logout();
                }
            }
        };

        checkAuthStatus();
    }, []);

    const loginHandler = async (email: string, password: string) => {
        try {
            const response = await login(email, password);
            
            if (response.token) {
                localStorage.setItem('token', response.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
                
                // Get full user data after setting token
                const userData = await getUserData();
                if (userData) {
                    const userInfo = {
                        id: userData.id,
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                        role: userData.role
                    };
                    setUser(userInfo);
                    return userInfo;
                }
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

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login: loginHandler, 
            register: registerHandler,
            logout 
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
