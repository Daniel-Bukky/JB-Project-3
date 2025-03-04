import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CircularProgress, Box } from "@mui/material";
import Statistics from '../Components/Statistics/Statistics';
import Credits from '../Components/Credits/Credits';
import NotFound from '../Components/NotFound/NotFound';

// Lazy load components
const Home = lazy(() => import("../Components/Home/Home"));
const Login = lazy(() => import("../Components/Login/Login"));
const Register = lazy(() => import("../Components/Register/Register"));
const Vacations = lazy(() => import("../Components/Vacations/Vacations"));
const CreateVacation = lazy(() => import("../Components/CreateVacation/CreateVacation"));

// Loading fallback component
const LoadingFallback = () => (
    <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
    }}>
        <CircularProgress />
    </Box>
);

export function Routing() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/vacations" element={<Vacations />} />
                <Route path="/create-vacation" element={<CreateVacation />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
