import { createContext, useState, ReactNode, useContext } from "react";
import { IUser } from "../models/index";
import { login, register } from "../api/authApi";

interface AuthContextType {
    user: IUser | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, cityId: number, birthday: Date, address: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loginHandler = async (email: string, password: string) => {
        try {
            const loggedInUser = await login(email, password);
            setUser(loggedInUser);
            setError(null);
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        }
    };

    const registerHandler = async (
        email: string,
        password: string,
        cityId: number,
        birthday: Date,
        address: string
    ) => {
        try {
            const registeredUser = await register(email, password, cityId, birthday, address);
            console.log(registeredUser);
            setError(null);
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login: loginHandler, register: registerHandler }} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
