import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { Layout } from "./Layout/Layout";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Layout />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
